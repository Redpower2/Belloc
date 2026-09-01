import { ChatInputCommandInteraction } from "discord.js";
import { UsuarioDB } from "../../schemas/usuario";

export const general: UsoEntidad = {
    async funcion(interaction: ChatInputCommandInteraction, usuario: UsuarioDB, usable: ItemInv, cantidad: number)
    {
        const mensaje = {
            content: `¡Usaste ${cantidad} ${usable.alias}s!`
        }
        return await interaction.fetchReply()
            ? interaction.followUp(mensaje)
            : interaction.reply(mensaje);
    },
    multiple: true
}