//Ver de agrupar varios iguales en uno mismo porque si no es un quilombo
//Tambien manejar lo de info y lo de usar
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ContainerBuilder, MessageFlags, SectionBuilder, TextDisplayBuilder } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { colores } from "../../../utils/general/colores";
import { Items } from "../../../schemas/item";
import { MINUTO } from "../../../utils/general/tiempo";
import { infoItem } from "../../../utils/general/infoItem";
import { responder } from "../../../utils/general/responder";

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
                        .setCustomId(`item_${item.subId}`)
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
    return await responder(interaction, {
        components: componentes,
        flags: MessageFlags.IsComponentsV2
    });
}



export async function execute(interaction: ChatInputCommandInteraction)
{
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
        await boton.deferUpdate();
        const { customId } = boton;
        switch(customId)
        {
            case "paginaminus":
                indice -= 1
                if(indice < 0)
                {
                    indice = itemsArrays.length - 1
                }
                await manejarArray(interaction, usuario, itemsArrays, indice);
            break;
            case "paginazero":
                indice = 0;
                await manejarArray(interaction, usuario, itemsArrays, indice);
            break;
            case "paginaplus":
                indice += 1
                if(indice > itemsArrays.length - 1)
                {
                    indice = 0;
                }
                await manejarArray(interaction, usuario, itemsArrays, indice);
            break;
            default:
                collector.stop();
                const subId = customId.replace("item_", "")
                const itemInv = inventario.find(i => i.subId === subId) as ItemInv;
                return await infoItem(boton, usuario, itemInv);
            break;
        }
    });
}