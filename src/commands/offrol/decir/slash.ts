import { ApplicationCommandOptionType, ChatInputApplicationCommandData } from "discord.js";


export const data: ChatInputApplicationCommandData = {
    name: "decir",
    description: "El bot repetirá lo que digas.",
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: "dicho",
            description: "Lo que quieras decir. Ojito con las barbaridades",
            max_length: 256
        }
    ]
}