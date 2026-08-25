import { ApplicationCommandOptionType, ChatInputApplicationCommandData } from "discord.js";


export const data: ChatInputApplicationCommandData = {
    name: "dinero",
    description: "Comandos del dinero",
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "ver",
            description: "Ver el dinero del usuario",
            options: [
                {
                    type: ApplicationCommandOptionType.User,
                    name: "usuario",
                    description: "Usuario al que quieres verle el dinero"
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "dar",
            description: "Dar dinero a un usuario",
            options: [
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "cantidad",
                    description: "Cantidad de dinero a dar",
                    required: true
                },
                {
                    type: ApplicationCommandOptionType.User,
                    name: "usuario",
                    description: "Usuario al que quieres darle dinero"
                }
            ]
        }
    ]
}