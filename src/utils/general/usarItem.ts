import { ChatInputCommandInteraction, MessageComponentInteraction, MessageFlags } from "discord.js";
import { usoEntidades } from "../../economy/usoEntidad";
import { Items, ItemDB } from "../../schemas/item";

export async function usarItem(interaction: ChatInputCommandInteraction | MessageComponentInteraction, itemInv: ItemInv, cantidad: number = 1)
{
    const responder = async (content: string) => {
        if (interaction.replied || interaction.deferred) {
            return interaction.editReply({ content });
        }
        return interaction.reply({ content, flags: MessageFlags.Ephemeral });
    };

    if(!itemInv.usable)
    {
        return await responder("¡Ese item no se puede usar!");
    }
    const item = await Items.findOne({ id: itemInv.id }) as ItemDB;
    const itemUso = usoEntidades[item.uso!];
    if(!itemUso || itemUso.evento)
    {
        return await responder("¡Ese item no se puede usar!");
    }
    if(cantidad && !itemUso.multiple)
    {
        return await responder("¡No puedes usar más de 1 de este item!");
    }

    return itemUso.funcion(interaction, itemInv, cantidad);
}