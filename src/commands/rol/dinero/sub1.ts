import { ChatInputCommandInteraction, Guild, GuildMember } from "discord.js";
import { UsuarioManager } from "../../../utils/general/UsuarioManager";
import { colores } from "../../../utils/general/colores";

export async function ver(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario") ?? interaction.user;
    const usuario = await UsuarioManager.obtener(userDisc);
    const { dinero, banco } = usuario;
    const servidor = (interaction.guild as Guild);
    const miembro = await servidor.members.fetch({
        user: userDisc
    }) as GuildMember;
    return await interaction.reply({
        embeds: [
            {
                title: `Dinero de ${miembro.nickname ?? userDisc.username}`,
                description: `-# Dinero total: ${dinero+banco}💲\n-# Dinero en efectivo: ${dinero}🪙\n-# Dinero en el banco: ${banco}💰`,
                color: colores.exitoMedio
            }
        ]
    });
}