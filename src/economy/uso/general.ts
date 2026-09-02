import { ChatInputCommandInteraction, MessageComponentInteraction, MessageFlags, TextDisplayBuilder } from "discord.js";

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
        if (interaction.replied || interaction.deferred) {
            const replyActual = await interaction.fetchReply();
            const esRespuestaV2 = replyActual.flags.has(MessageFlags.IsComponentsV2);
            
            return interaction.editReply(
                esRespuestaV2 ? mensajeV2 : mensaje
            );
        }
        return interaction.reply(mensaje);
    },
    multiple: true
}