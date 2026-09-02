import { ChatInputCommandInteraction } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { responder } from "../../../utils/general/responder";

export async function limpiarinvUsuario(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario", true);
    const usuario = await UsuarioManager.obtener(userDisc);
    await usuario.updateOne({
        inventario: []
    });
    return await responder(interaction, {
        content: "¡Inventario limpiado!"
    });
}