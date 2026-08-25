import { ChatInputCommandInteraction } from "discord.js";
import { Usuarios } from "../../../schemas/usuario";
import { colores } from "../../../utils/general/colores";


export async function execute(interaction: ChatInputCommandInteraction)
{
    const usuarios = await Usuarios.find({});
    if(usuarios.length === 0)
    {
        return await interaction.reply({
            content: "Son todos pobres en el servidor."
        });
    }
    const users = await Promise.all(
        usuarios.map(u =>
        {
            return {
                nombre: u.nombre,
                dinero: u.dinero + u.banco
            }
        })
    );

    const top = users
        .sort((a, b) =>
        {
            return b.dinero - a.dinero;
        })
        .slice(0, 10);

    const emojis = ["💎", "💰", "💲"];
    const descripcion = top
    .map(({ nombre, dinero }, i) =>
    {
        const emoji = emojis[i] ?? "🪙";
        return `${emoji} ${i + 1}. ${nombre}: ${dinero}`;
    }
    )
    .join("\n");

    return await interaction.reply({
        embeds: [
            {
                title: "Los más ricos",
                description: descripcion,
                color: colores.personaje
            }
        ]
    })
}