import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { commandList } from "../..";
import { colores } from "../../../utils/general/colores";

export async function general(interaction: ChatInputCommandInteraction)
{
    const embed = new EmbedBuilder({
        title: "Los comandos del servidor",
        fields: [],
        color: colores.random()
    });

    const comandos = Object.values(commandList).sort((a, b) => a.data.name.localeCompare(b.data.name));

    for(const command of Object.values(comandos))
    {
        if(!command.ayuda.staff)
        {
            embed.addFields([{ 
                name: command.ayuda.nombre + command.ayuda.emoji,
                value: command.ayuda.descripcion,
                inline: true
            }]);
        }
    }
    return await interaction.reply({
        embeds: [embed]
    });
}