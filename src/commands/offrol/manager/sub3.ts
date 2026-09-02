import { ChatInputCommandInteraction } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { responder } from "../../../utils/general/responder";

export async function borrarUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    await UsuarioManager.borrar(userDisc);
    return await responder(interaction, {
        content: `<@${userDisc.id}> borrado de la base de datos.`
    });
}