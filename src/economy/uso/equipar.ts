import { ChatInputCommandInteraction, MessageComponentInteraction, TextDisplayBuilder } from "discord.js";
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
        const mensaje = {
                content: `¡Equipaste tu ${usable.alias}! [${usable.durabilidadActual}]`
        };
        const mensajeV2 = {
            components: [
                new TextDisplayBuilder({ content: `¡Equipaste tu ${usable.alias}! [${usable.durabilidadActual}]` })
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