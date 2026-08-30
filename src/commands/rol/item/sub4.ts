import { ChatInputCommandInteraction } from "discord.js";

export async function usar(interaction: ChatInputCommandInteraction)
{
    const nombre = interaction.options.getString("nombre");
    const subId = interaction.options.getString("sub-id");
}