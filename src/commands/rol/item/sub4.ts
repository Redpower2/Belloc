import { ChatInputCommandInteraction, CommandInteractionOptionResolver, MessageComponentInteraction, MessageFlags } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { ItemDB, Items } from "../../../schemas/item";
import { usoEntidades } from "../../../economy/usoEntidad";

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


export async function usar(interaction: ChatInputCommandInteraction)
{
    const options = interaction.options as CommandInteractionOptionResolver;
    const nombre = options.getString("nombre");
    const subId = options.getString("sub-id");
    const cantidad = options.getInteger("cantidad") ?? 1;
    if(nombre && subId || !options.data.length)
    {
        return await interaction.reply({
            content: "Parametros inválidos",
            flags: MessageFlags.Ephemeral
        });
    }
    const usuario = await UsuarioManager.obtener(interaction.user);
    const itemInv = usuario.inventario.find(i => 
    {
        if(nombre)
        {
            return i.alias === nombre
        }
        else
        {
            return i.subId === subId
        }
    });
    if(!itemInv)
    {
        return await interaction.reply({
            content: "No tienes ese item.",
            flags: MessageFlags.Ephemeral
        });
    }
    return await usarItem(interaction, itemInv, cantidad);
}