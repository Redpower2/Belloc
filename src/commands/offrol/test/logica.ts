import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { responder } from "../../../utils/general/responder";


export async function execute(interaction: ChatInputCommandInteraction)
{
    return await responder(interaction, {
        content: "Estoy vivo.",
        flags: MessageFlags.Ephemeral
    });
}