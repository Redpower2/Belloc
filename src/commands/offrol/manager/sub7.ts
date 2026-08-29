import { ChatInputCommandInteraction } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";

export async function limpiarinvUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    await usuario.updateOne({
        inventario: []
    });
    return await interaction.reply({
        content: "¡Inventario limpiado!"
    });
}