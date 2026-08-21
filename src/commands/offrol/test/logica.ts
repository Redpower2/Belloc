import { ChatInputCommandInteraction } from "discord.js";


export async function execute(interaction: ChatInputCommandInteraction)
{
    return await interaction.editReply({
        content: "Test"
    });
}