import { ApplicationCommandOptionType, ChatInputApplicationCommandData } from "discord.js";


export const data: ChatInputApplicationCommandData = {
    name: "ayuda",
    description: "Ver los comandos del servidor",
    options: [{
        type: ApplicationCommandOptionType.Subcommand,
        name: "staff",
        description: "Los comandos del staff"
    },
    {
        type: ApplicationCommandOptionType.Subcommand,
        name: "general",
        description: "Todos los comandos que puede usar un miembro"
    },
    {
        type: ApplicationCommandOptionType.Subcommand,
        name: "comando",
        description: "Ver los subcomandos de un comando",
        options: [{
            type: ApplicationCommandOptionType.String,
            name: "nombre",
            description: "Nombre del comando",
            required: true
        }]
    }]
}