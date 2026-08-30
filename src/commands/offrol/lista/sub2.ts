import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, TextDisplayBuilder } from "discord.js";
import { Items } from "../../../schemas/item";
import { colores } from "../../../utils/general/colores";
import { MINUTO } from "../../../utils/general/tiempo";
async function manejarArray(interaction: ChatInputCommandInteraction, itemsArrays: Item[][], indice: number)
{
    const componentes = [];
    const descripcion = itemsArrays[indice]
        .map(u => `${u.nombre} | <@${u.id}>`)
        .join("\n");
    const { length } = itemsArrays
    const embed = new EmbedBuilder()
        .setTitle(`Items del servidor (${indice + 1}/${length})`)
        .setDescription(descripcion)
        .setColor(colores.personaje);
    if(length > 1)
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
        componentes.push(row);
    }
    return await interaction.editReply({
        embeds: [embed],
        components: componentes
    });
}


export async function items(interaction: ChatInputCommandInteraction)
{
    await interaction.deferReply();
    const items = Items.find({});
    const itemsArrays: Item[][] = [];
    let indice = -1;
    const mensaje = await manejarArray(interaction, itemsArrays, indice);
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
            await manejarArray(interaction, itemsArrays, indice);
        }
        else if(customId === "paginazero")
        {
            indice = 0;
            await manejarArray(interaction, itemsArrays, indice);
        }
        else if(customId === "paginaplus")
        {
            indice += 1
            if(indice > itemsArrays.length - 1)
            {
                indice = 0;
            }
            await manejarArray(interaction, itemsArrays, indice);
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