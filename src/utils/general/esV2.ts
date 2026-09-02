import { MessageComponentInteraction, MessageFlags } from "discord.js";

export function esV2(interaction: MessageComponentInteraction)
{
    return interaction.message?.flags.has(MessageFlags.IsComponentsV2) ?? false;
}