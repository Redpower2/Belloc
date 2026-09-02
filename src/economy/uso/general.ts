import { ChatInputCommandInteraction, MessageComponentInteraction, TextDisplayBuilder } from "discord.js";
import { UsuarioDB } from "../../schemas/usuario";
import { esV2 } from "../../utils/general/esV2";

export const general: UsoEntidad = {
    async funcion(interaction: ChatInputCommandInteraction | MessageComponentInteraction, usable: ItemInv, cantidad: number)
    {
        const mensaje = {
            content: `¡Usaste ${cantidad} ${usable.alias}s!`
        }
        const mensajeV2 = {
            components: [
                new TextDisplayBuilder({ content: `¡Usaste ${cantidad} ${usable.alias}s!` })
            ]
        }
        return await interaction.fetchReply()
            ? interaction.editReply(
                esV2(interaction as MessageComponentInteraction)
                ? mensajeV2
                : mensaje
            )
            : interaction.reply(mensaje);
    },
    multiple: true
}