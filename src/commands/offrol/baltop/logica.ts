import { ChatInputCommandInteraction } from "discord.js";
import { Usuarios } from "../../../schemas/usuario";
import { colores } from "../../../utils/general/colores";
import { responder } from "../../../utils/general/responder";


export async function execute(interaction: ChatInputCommandInteraction)
{
    const usuarios = await Usuarios.find({});
    if(usuarios.length === 0)
    {
        return await responder(interaction, {
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

    return await responder(interaction, {
        embeds: [
            {
                title: "Los más ricos",
                description: descripcion,
                color: colores.personaje
            }
        ]
    })
}