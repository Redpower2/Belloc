import { ChatInputCommandInteraction } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { UsuarioEconomy } from "../../../economy/UsuarioEconomy";
import { responder } from "../../../utils/general/responder";

export async function dardineroUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const cantidad = interaction.options.getInteger("cantidad", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const dinero = await UsuarioEconomy.dardinero(usuario, cantidad);
    if(dinero === null)
    {
        return await responder(interaction, {
            content: "Cantidad inválida"
        })
    }
    return await responder(interaction, {
        content: `Dinero dado a <@${userDisc.id}> (${dinero}🪙)`
    });
}

export async function quitardineroUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const cantidad = interaction.options.getInteger("cantidad", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const dinero = await UsuarioEconomy.quitardinero(usuario, cantidad);
    if(dinero === null)
    {
        return await responder(interaction, {
            content: "Cantidad inválida"
        })
    }
    return await responder(interaction, {
        content: `Dinero quitado a <@${userDisc.id}> (${dinero}🪙)`
    });
}

export async function fijardineroUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const cantidad = interaction.options.getInteger("cantidad", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const dinero = await UsuarioEconomy.fijardinero(usuario, cantidad);
    if(dinero === null)
    {
        return await responder(interaction, {
            content: "Cantidad inválida"
        })
    }
    return await responder(interaction, {
        content: `Dinero fijado a <@${userDisc.id}> (${dinero}🪙)`
    });
}

export async function darbancoUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const cantidad = interaction.options.getInteger("cantidad", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const dinero = await UsuarioEconomy.dardinero(usuario, cantidad, "banco");
    if(dinero === null)
    {
        return await responder(interaction, {
            content: "Cantidad inválida"
        })
    }
    return await responder(interaction, {
        content: `Dinero dado al banco de <@${userDisc.id}> (${dinero}🪙)`
    });
}

export async function quitarbancoUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const cantidad = interaction.options.getInteger("cantidad", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const dinero = await UsuarioEconomy.quitardinero(usuario, cantidad, "banco");
    if(dinero === null)
    {
        return await responder(interaction, {
            content: "Cantidad inválida"
        })
    }
    return await responder(interaction, {
        content: `Dinero quitado del banco de <@${userDisc.id}> (${dinero}🪙)`
    });
}

export async function fijarbancoUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const cantidad = interaction.options.getInteger("cantidad", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const dinero = await UsuarioEconomy.fijardinero(usuario, cantidad, "banco");
    if(dinero === null)
    {
        return await responder(interaction, {
            content: "Cantidad inválida"
        })
    }
    return await responder(interaction, {
        content: `Dinero fijado al banco de <@${userDisc.id}> (${dinero}🪙)`
    });
}