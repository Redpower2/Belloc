import { ChatInputCommandInteraction } from "discord.js";
import { Usuarios } from "../../../schemas/usuario";
import { colores } from "../../../utils/general/colores";

export async function usuarios(interaction: ChatInputCommandInteraction)
{
    const usuarios = await Usuarios.find({});
    const descripcion = usuarios.length
        ? usuarios.map(u => `${u.nombre} | <@${u.id}>`).join("\n")
        : "No hay usuarios activos en el servidor.";
    return await interaction.reply({
        embeds: [
            {
                title: "Usuarios del servidor",
                description: descripcion,
                color: colores.random()
            }
        ]
    });
}