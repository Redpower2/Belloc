import { ApplicationCommandOptionType, ChatInputApplicationCommandData } from "discord.js";


export const data: ChatInputApplicationCommandData = {
    name: "inventario",
    description: "Ver el inventario de un usuario",
    options: [
        {
            type: ApplicationCommandOptionType.User,
            name: "usuario",
            description: "Usuario al que quieres verle el inventario"
        }
    ]
}