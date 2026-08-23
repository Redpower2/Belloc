import { ChatInputCommandInteraction } from "discord.js";
import { verifPermisos } from "../../../utils/general/verifPermisos";


export async function execute(interaction: ChatInputCommandInteraction)
{
    const verif = await verifPermisos(interaction)
    if(!verif)
    {
        return true;
    }
}