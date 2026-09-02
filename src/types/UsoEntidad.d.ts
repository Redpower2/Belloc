import { RepliableInteraction } from "discord.js";

interface UsoEntidad
{
    funcion(interaction: RepliableInteraction, usable: ItemInv, cantidad?: number): any,
    multiple?: boolean,
    evento?: boolean
}