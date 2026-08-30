import { ChatInputCommandInteraction } from "discord.js";

export async function info(interaction: ChatInputCommandInteraction)
{
    const nombre = interaction.options.getString("nombre");
    const id = interaction.options.getInteger("id");
    const subId = interaction.options.getString("sub-id");
}