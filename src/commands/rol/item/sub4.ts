import { ChatInputCommandInteraction, CommandInteractionOptionResolver, MessageComponentInteraction, MessageFlags } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { usarItem } from "../../../utils/general/usarItem";




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