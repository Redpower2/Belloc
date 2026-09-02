import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { commandList } from "../..";
import { responder } from "../../../utils/general/responder";
interface SubcomandoAyuda 
{
    nombre: string,
    emoji: string,
    descripcion: string
}

export async function comando(interaction: ChatInputCommandInteraction)
{
    const stringComando = interaction.options.getString("nombre", true);
    const comando = commandList[stringComando]
    if(!comando || !comando.ayuda.subcomandos)
    {
        return await responder(interaction, {
            content: "¡Este comando no tiene subcomandos!",
            flags: 64
        })
    }
    const embed = new EmbedBuilder({
        title: `Subcomandos de ${comando.ayuda.nombre}${comando.ayuda.emoji}`,
        fields: [],
        color: comando.ayuda.color as number
    });
    const subcomandos = [...comando.ayuda.subcomandos].sort((a, b) => a.nombre.localeCompare(b.nombre)
    );
    for(const subcommand of subcomandos as SubcomandoAyuda[])
    {
        embed.addFields([{ 
            name: subcommand.nombre + subcommand.emoji,
            value: subcommand.descripcion,
            inline: true
        }]);
    }
    return await responder(interaction, {
        embeds: [embed]
    });
}