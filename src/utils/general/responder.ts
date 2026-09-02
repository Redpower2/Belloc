import { InteractionDeferReplyOptions, InteractionEditReplyOptions, InteractionReplyOptions, RepliableInteraction } from "discord.js";

export async function responder(interaction: RepliableInteraction, contenido: InteractionReplyOptions | InteractionEditReplyOptions)
{
    if(interaction.replied || interaction.deferred)
    {
        return interaction.editReply(contenido as InteractionEditReplyOptions);
    }
    return interaction.reply(contenido as InteractionReplyOptions);
}