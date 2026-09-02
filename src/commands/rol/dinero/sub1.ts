import { ChatInputCommandInteraction, Guild } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { colores } from "../../../utils/general/colores";
import { responder } from "../../../utils/general/responder";

export async function ver(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario") ?? interaction.user;
    const usuario = await UsuarioManager.obtener(userDisc);
    const { dinero, banco } = usuario;
    const servidor = (interaction.guild as Guild);
    return await responder(interaction, {
        embeds: [
            {
                title: `Dinero de ${usuario.nombre}`,
                description: `-# Dinero total: ${dinero+banco}💲\n-# Dinero en efectivo: ${dinero}🪙\n-# Dinero en el banco: ${banco}💰`,
                color: colores.exitoMedio
            }
        ]
    });
}