import { ChatInputCommandInteraction } from "discord.js";
import { UsuarioDB } from "../../schemas/usuario";

export const equipar: UsoEntidad = {
    async funcion(interaction: ChatInputCommandInteraction, usuario: UsuarioDB, usable: ItemInv, cantidad: number)
    {
        await usuario.updateOne(
            {
                "inventario.subId": usable.subId
            },
            {
                "inventario.$.equipado": true
            }
        );
        const mensaje = {
                content: `¡Equipaste tu ${usable.alias}! [${usable.durabilidadActual}]`
        };
        return await interaction.fetchReply()
            ? interaction.followUp(mensaje)
            : interaction.reply(mensaje);
    },
    multiple: true
}