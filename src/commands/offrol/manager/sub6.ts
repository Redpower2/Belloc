import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { UsuarioEconomy } from "../../../economy/UsuarioEconomy";
import { Items } from "../../../schemas/item";

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
        return await interaction.reply({
            content: "No hay ningun item con ese id.",
            flags: MessageFlags.Ephemeral
        });
    }
    const itemDado = await UsuarioEconomy.daritem(usuario, item, cantidad);
    if(!itemDado)
    {
        return await interaction.reply({
            content: "Cantidad inválida."
        });
    }
    return await interaction.reply({
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
        return await interaction.reply({
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
        return await interaction.reply({
            content: "¡Escoge un parámetro!",
            flags: MessageFlags.Ephemeral
        });
    }
    const prm2 = id ?? subId as string | number;
    const cantidad = interaction.options.getInteger("cantidad") ?? 1;
    const itemDado = await UsuarioEconomy.quitaritem(usuario, prm1, prm2, cantidad);
    if(!itemDado)
    {
        return await interaction.reply({
            content: "Cantidad inválida."
        });
    }
    return await interaction.reply({
        content: "Item quitado"
    });
}