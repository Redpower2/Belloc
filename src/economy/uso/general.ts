import { ChatInputCommandInteraction } from "discord.js";
import { UsuarioDB } from "../../schemas/usuario";

export const general: UsoEntidad = {
    funcion(interaction: ChatInputCommandInteraction, usuario: UsuarioDB, usable: ItemInv, cantidad: number)
    {
        return interaction.reply({
            content: `¡Usaste ${cantidad} ${usable.alias}s!`
        });
    },
    multiple: true
}