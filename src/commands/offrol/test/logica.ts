import { ChatInputCommandInteraction } from "discord.js";


export async function execute(interaction: ChatInputCommandInteraction)
{
    return await interaction.reply({
        content: "Test"
    });
}