import { ChatInputCommandInteraction } from "discord.js";
import { UsuarioManager } from "../../../utils/general/UsuarioManager";
import { UsuarioEconomy } from "../../../utils/general/UsuarioEconomy";

export async function dardineroUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const cantidad = interaction.options.getInteger("cantidad", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const dinero = await UsuarioEconomy.dardinero(usuario, cantidad);
    return await interaction.reply({
        content: `Dinero dado a <@${userDisc.id}> (${dinero}🪙)`
    });
}

export async function quitardineroUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const cantidad = interaction.options.getInteger("cantidad", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const dinero = await UsuarioEconomy.quitardinero(usuario, cantidad);
    if(!dinero)
    {
        return await interaction.reply({
            content: "No se le puede sacar más dinero que el que tiene el usuario."
        })
    }
    return await interaction.reply({
        content: `Dinero quitado a <@${userDisc.id}> (${dinero}🪙)`
    });
}

export async function fijardineroUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const cantidad = interaction.options.getInteger("cantidad", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const dinero = await UsuarioEconomy.fijardinero(usuario, cantidad);
    return await interaction.reply({
        content: `Dinero fijado a <@${userDisc.id}> (${dinero}🪙)`
    });
}

export async function darbancoUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const cantidad = interaction.options.getInteger("cantidad", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const dinero = await UsuarioEconomy.dardinero(usuario, cantidad, "banco");
    return await interaction.reply({
        content: `Dinero dado al banco de <@${userDisc.id}> (${dinero}🪙)`
    });
}

export async function quitarbancoUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const cantidad = interaction.options.getInteger("cantidad", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const dinero = await UsuarioEconomy.quitardinero(usuario, cantidad, "banco");
    if(!dinero)
    {
        return await interaction.reply({
            content: "No se le puede sacar más dinero que el que tiene el usuario."
        })
    }
    return await interaction.reply({
        content: `Dinero quitado del banco de <@${userDisc.id}> (${dinero}🪙)`
    });
}

export async function fijarbancoUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const cantidad = interaction.options.getInteger("cantidad", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    const dinero = await UsuarioEconomy.fijardinero(usuario, cantidad, "banco");
    return await interaction.reply({
        content: `Dinero fijado al banco de <@${userDisc.id}> (${dinero}🪙)`
    });
}