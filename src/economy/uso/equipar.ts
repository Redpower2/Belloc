import { ChatInputCommandInteraction } from "discord.js";
import { UsuarioDB } from "../../schemas/usuario";

export const general: UsoEntidad = {
    async funcion(interaction: ChatInputCommandInteraction, usuario: UsuarioDB, usable: ItemInv, cantidad: number)
    {
        await usuario.updateOne(
            {
                "inventario.subId": usable.subId
            },
            {
                "inventario.$.equipado": true
            }
        )
        return interaction.reply({
            content: `¡Equipaste tu ${usable.alias}! [${usable.durabilidadActual}]`
        });
    },
    multiple: true
}