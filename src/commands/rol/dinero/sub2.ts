import { ChatInputCommandInteraction } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { UsuarioEconomy } from "../../../economy/UsuarioEconomy";
import { responder } from "../../../utils/general/responder";

export async function dar(interaction: ChatInputCommandInteraction)
{
    const cantidad = interaction.options.getInteger("cantidad", true);
    const userDisc = interaction.options.getUser("usuario", true);
    const banco = interaction.options.getBoolean("banco")
        ? "banco"
        : "dinero";
    const usuario1 = await UsuarioManager.obtener(interaction.user);
    const dinero1 = await UsuarioEconomy.quitardinero(usuario1, cantidad, banco);
    if(dinero1 === null)
    {
        return await responder(interaction, {
            content: "Cantidad inválida."
        });
    }
    const usuario2 = await UsuarioManager.obtener(userDisc);
    const dinero2 = await UsuarioEconomy.dardinero(usuario2, cantidad, banco);
    const simbolo = banco === "banco"
        ? "💰"
        : "🪙"
    return await responder(interaction, {
        content: `<@${interaction.user.id}> (${dinero1}${simbolo}) le dió dinero a <@${userDisc.id}> (${dinero2}${simbolo})`
    });

}