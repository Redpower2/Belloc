import { ChatInputCommandInteraction, CommandInteractionOptionResolver, MessageComponentInteraction, MessageFlags } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { ItemDB, Items } from "../../../schemas/item";
import { usoEntidades } from "../../../economy/usoEntidad";
import { UsuarioDB } from "../../../schemas/usuario";

export async function usarItem(interaction: ChatInputCommandInteraction | MessageComponentInteraction, itemInv: ItemInv, cantidad: number = 1)
{
    if(!itemInv.usable)
    {
        return await interaction.reply({
            content: "¡Ese item no se puede usar!",
            flags: MessageFlags.Ephemeral
        });
    }
    const item = await Items.findOne({
        id: itemInv.id
    }) as ItemDB;
    const itemUso = usoEntidades[item.uso!];
    if(!itemUso || itemUso.evento)
    {
        return await interaction.reply({
            content: "¡Ese item no se puede usar!",
            flags: MessageFlags.Ephemeral
        });
    }
    if(cantidad && !itemUso.multiple)
    {
        return await interaction.reply({
            content: "¡No puedes usar más de 1 de este item!",
            flags: 64
        });
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