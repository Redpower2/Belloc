//Ver de agrupar varios iguales en uno mismo porque si no es un quilombo
//Tambien manejar lo de info y lo de usar
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ContainerBuilder, MessageFlags, SectionBuilder, TextDisplayBuilder } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { colores } from "../../../utils/general/colores";
import { Items } from "../../../schemas/item";
import { MINUTO } from "../../../utils/general/tiempo";

async function manejarArray(interaction: ChatInputCommandInteraction, usuario: Usuario, itemsArrays: ItemInv[][], indice: number)
{
    const componentes = [];
    const { length } = itemsArrays;
    const container = new ContainerBuilder()
        .setAccentColor(colores.especial)
        .addTextDisplayComponents(display => display.setContent(`## Inventario de ${usuario.nombre} (${indice+1}/${length})`));
    if(itemsArrays[indice] && itemsArrays[indice].length)
    {
        for(const item of itemsArrays[indice])
        {
            const equipadoText = item.equipado
                ? " (Equipado)"
                : "";
            const section = new SectionBuilder()
                .addTextDisplayComponents(display => display.setContent(`### ${item.alias+equipadoText}`))
                .setButtonAccessory(
                    new ButtonBuilder()
                        .setCustomId(`item_${item.id}_${item.subId}`)
                        .setLabel("Info")
                        .setEmoji("🔍")
                        .setStyle(ButtonStyle.Primary)
                )
            if(item.durabilidadActual)
            {
                const niveles = ["⬛","🟥","🟨","🟩"];
                const itemDB = await Items.findOne({
                    id: item.id
                });
                if(!itemDB)
                {
                    continue;
                }
                const porcentaje = item.durabilidadActual / itemDB.durabilidad * 100;
                const llenos = Math.round(porcentaje / 100 * 6);
                const color = porcentaje > 50 
                    ? niveles[3] 
                    : porcentaje > 25 
                    ? niveles[2] 
                    : niveles[1];

                const barra = color.repeat(llenos) + niveles[0].repeat(6 - llenos);

                section.addTextDisplayComponents(display => display.setContent(`-# [${barra}]`))
            }
            container
                .addSectionComponents(section);
        }
    }
    else
    {
        container
            .addTextDisplayComponents(display => display.setContent("No hay items disponibles para mostrar."))
    }
    componentes.push(container);
    if(itemsArrays.length > 1)
    {
        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("paginaminus")
                    .setEmoji("⬅️")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("paginazero")
                    .setEmoji("🔄️")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("paginaplus")
                    .setEmoji("➡️")
                    .setStyle(ButtonStyle.Primary)
            );
        componentes.push(row)
    }
    return await interaction.editReply({
        components: componentes,
        flags: MessageFlags.IsComponentsV2
    });
}



export async function execute(interaction: ChatInputCommandInteraction)
{
    await interaction.deferReply();
    const userDisc = interaction.options.getUser("usuario") ?? interaction.user;
    const usuario = await UsuarioManager.obtener(userDisc);
    const { inventario } = usuario;
    const itemsArrays: ItemInv[][] = [];
    let indice = -1;
    for(let i = 0 ; i < inventario.length ; i++)
    {
        if(i%12 === 0)
        {
            indice += 1;
            itemsArrays.push([]);
        }
        itemsArrays[indice].push(inventario[i]);
    }
    indice = 0;
    const mensaje = await manejarArray(interaction, usuario, itemsArrays, indice);
    const collector = mensaje.createMessageComponentCollector({
        filter: i => i.user.id === interaction.user.id,
        time: 10 * MINUTO
    });
    collector.on("collect", async boton => 
    {
        const { customId } = boton;
        await boton.deferUpdate();
        if(customId === "paginaminus")
        {
            indice -= 1
            if(indice < 0)
            {
                indice = itemsArrays.length - 1
            }
            await manejarArray(interaction, usuario, itemsArrays, indice);
        }
        else if(customId === "paginazero")
        {
            indice = 0;
            await manejarArray(interaction, usuario, itemsArrays, indice);
        }
        else if(customId === "paginaplus")
        {
            indice += 1
            if(indice > itemsArrays.length - 1)
            {
                indice = 0;
            }
            await manejarArray(interaction, usuario, itemsArrays, indice);
        }
        else
        {
            return collector.stop("info_sub-id");
        }
    });
    collector.on("end", async (_, reason) => 
    {
        switch(reason)
        {
            case "time":
                return await interaction.editReply({
                    components: [
                        new TextDisplayBuilder({ content: "Tiempo de visualización finalizado." })
                    ]
                });
            case "info_sub-id":
                return await interaction.editReply({
                    components: [
                        new TextDisplayBuilder({ content: "No deberias estar viendo esto" })
                    ]
                });
        }
    });
}