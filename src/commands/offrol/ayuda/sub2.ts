import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { commandList } from "../..";
import { colores } from "../../../utils/general/colores";
import { responder } from "../../../utils/general/responder";

export async function staff(interaction: ChatInputCommandInteraction)
{
    const embed = new EmbedBuilder({
        title: "Los comandos del staff",
        fields: [],
        color: colores.random()
    });

    const comandos = Object.values(commandList).sort((a, b) => a.data.name.localeCompare(b.data.name));
    for(const command of Object.values(comandos))
    {
        if(command.ayuda.staff)
        {
            embed.addFields([{ 
                name: command.ayuda.nombre + command.ayuda.emoji,
                value: command.ayuda.descripcion,
                inline: true
            }]);
        }
    }
    return await responder(interaction, {
        embeds: [embed]
    });
}