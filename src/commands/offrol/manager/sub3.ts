import { ChatInputCommandInteraction } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";

export async function borrarUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    await UsuarioManager.borrar(userDisc);
    return await interaction.reply({
        content: `<@${userDisc.id}> borrado de la base de datos.`
    });
}