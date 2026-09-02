import { MessageFlags, RepliableInteraction, TextDisplayBuilder } from "discord.js";
import { usoEntidades } from "../../economy/usoEntidad";
import { Items, ItemDB } from "../../schemas/item";
import { responder } from "./responder";

export async function usarItem(interaction: RepliableInteraction, itemInv: ItemInv, cantidad: number = 1)
{
    if(!itemInv.usable)
    {
        return await responder(interaction, {
            components: [
                new TextDisplayBuilder({ content: "¡Ese item no se puede usar!" })
            ],
            flags: MessageFlags.IsComponentsV2
        });
    }
    const item = await Items.findOne({ id: itemInv.id }) as ItemDB;
    const itemUso = usoEntidades[item.uso!];
    if(!itemUso || itemUso.evento)
    {
        return await responder(interaction, {
            components: [
                new TextDisplayBuilder({ content: "¡Ese item no se puede usar!" })
            ],
            flags: MessageFlags.IsComponentsV2
        });
    }
    if(cantidad && !itemUso.multiple)
    {
        return await responder(interaction, {
            components: [
                new TextDisplayBuilder({ content: "¡No puedes usar más de 1 de este item!" })
            ],
            flags: MessageFlags.IsComponentsV2
        });
    }

    return itemUso.funcion(interaction, itemInv, cantidad);
}