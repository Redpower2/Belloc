import { ApplicationCommandOptionType, ChatInputApplicationCommandData } from "discord.js";


export const data: ChatInputApplicationCommandData = {
    name: "lista",
    description: "Listado de cosas",
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "usuarios",
            description: "Los usuarios del servidor"
        }
    ]
}