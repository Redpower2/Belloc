import { ChatInputCommandInteraction, MessageFlags } from "discord.js";


export async function execute(interaction: ChatInputCommandInteraction)
{
    return await interaction.reply({
        content: "Estoy vivo.",
        flags: MessageFlags.Ephemeral
    });
}