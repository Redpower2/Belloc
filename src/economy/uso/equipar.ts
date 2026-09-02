import { ChatInputCommandInteraction, MessageComponentInteraction, MessageFlags, TextDisplayBuilder } from "discord.js";
import { UsuarioDB, Usuarios } from "../../schemas/usuario";
import { esV2 } from "../../utils/general/esV2";

export const equipar: UsoEntidad = {
    async funcion(interaction: ChatInputCommandInteraction | MessageComponentInteraction, usable: ItemInv, cantidad: number)
    {
        await Usuarios.updateOne(
            {
                "inventario.subId": usable.subId
            },
            {
                $set: { 
                    "inventario.$.equipado": !usable.equipado
                }
            }
        );
        const toggle = usable.equipado
            ? "Desequipaste"
            : "Equipaste"
        const mensaje = {
                content: `¡${toggle} tu ${usable.alias}! [${usable.durabilidadActual}]`
        };
        const mensajeV2 = {
            components: [
                new TextDisplayBuilder({ content: `¡${toggle} tu ${usable.alias}! [${usable.durabilidadActual}]` })
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