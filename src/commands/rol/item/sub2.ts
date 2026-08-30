import { ChatInputCommandInteraction } from "discord.js";

export async function dar(interaction: ChatInputCommandInteraction)
{
    const nombre = interaction.options.getString("nombre");
    const subId = interaction.options.getString("sub-id");
    const cantidad = interaction.options.getInteger("cantidad") ?? 1;
}