import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { UsuarioEconomy } from "../../../economy/UsuarioEconomy";
import { Items } from "../../../schemas/item";
import { responder } from "../../../utils/general/responder";

export async function daritemUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const id = interaction.options.getInteger("id", true);
    const cantidad = interaction.options.getInteger("cantidad") ?? 1;
    const item = await Items.findOne({
        id
    });
    if(!item || item.nombre === "### ELIMINADO ###")
    {
        return await responder(interaction, {
            content: "No hay ningun item con ese id.",
            flags: MessageFlags.Ephemeral
        });
    }
    const itemDado = await UsuarioEconomy.daritem(usuario, item, cantidad);
    if(!itemDado)
    {
        return await responder(interaction, {
            content: "Cantidad inválida."
        });
    }
    return await responder(interaction, {
        content: "¡Item dado!"
    })
}

export async function quitaritemUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const id = interaction.options.getInteger("id");
    const subId = interaction.options.getString("sub-id");
    if(id && subId)
    {
        return await responder(interaction, {
            content: "No puedes usar 2 parametros incluyentes entre sí."
        });
    }
    const prm1 = id
        ? "id"
        : subId
            ? "subId"
            : null;
    if(!prm1)
    {
        return await responder(interaction, {
            content: "¡Escoge un parámetro!",
            flags: MessageFlags.Ephemeral
        });
    }
    const prm2 = id ?? subId as string | number;
    const cantidad = interaction.options.getInteger("cantidad") ?? 1;
    const itemDado = await UsuarioEconomy.quitaritem(usuario, prm1, prm2, cantidad);
    if(!itemDado)
    {
        return await responder(interaction, {
            content: "Cantidad inválida."
        });
    }
    return await responder(interaction, {
        content: "Item quitado"
    });
}