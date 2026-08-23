import { ApplicationCommandOptionType, ChatInputApplicationCommandData } from "discord.js";


export const data: ChatInputApplicationCommandData = {
    name: "manager",
    description: "Comandos del Bot Manager",
    options: [
        {
            type: ApplicationCommandOptionType.SubcommandGroup,
            name: "usuario",
            description: "Comandos de usuario",
            options: [
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "dardinero",
                    description: "Dar dinero a un usuario",
                    options: [
                        {
                            type: ApplicationCommandOptionType.User,
                            name: "usuario",
                            description: "El usuario al que le darás el dinero",
                            required: true
                        },
                        {
                            type: ApplicationCommandOptionType.Integer,
                            name: "cantidad",
                            description: "La cantidad de dinero que le darás",
                            required: true
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "quitardinero",
                    description: "Quitar dinero a un usuario",
                    options: [
                        {
                            type: ApplicationCommandOptionType.User,
                            name: "usuario",
                            description: "El usuario al que le quitarás el dinero",
                            required: true
                        },
                        {
                            type: ApplicationCommandOptionType.Integer,
                            name: "cantidad",
                            description: "La cantidad de dinero que le quitarás",
                            required: true
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "fijardinero",
                    description: "Fijar dinero de un usuario",
                    options: [
                        {
                            type: ApplicationCommandOptionType.User,
                            name: "usuario",
                            description: "El usuario al que le cambiarás el dinero",
                            required: true
                        },
                        {
                            type: ApplicationCommandOptionType.Integer,
                            name: "cantidad",
                            description: "La cantidad de dinero que le fijarás",
                            required: true
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "darbanco",
                    description: "Dar dinero al banco de a un usuario",
                    options: [
                        {
                            type: ApplicationCommandOptionType.User,
                            name: "usuario",
                            description: "El usuario al que le darás el dinero",
                            required: true
                        },
                        {
                            type: ApplicationCommandOptionType.Integer,
                            name: "cantidad",
                            description: "La cantidad de dinero que le darás",
                            required: true
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "quitardinero",
                    description: "Quitar dinero al banco de a un usuario",
                    options: [
                        {
                            type: ApplicationCommandOptionType.User,
                            name: "usuario",
                            description: "El usuario al que le quitarás el dinero",
                            required: true
                        },
                        {
                            type: ApplicationCommandOptionType.Integer,
                            name: "cantidad",
                            description: "La cantidad de dinero que le quitarás",
                            required: true
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "fijardinero",
                    description: "Fijar dinero del banco de un usuario",
                    options: [
                        {
                            type: ApplicationCommandOptionType.User,
                            name: "usuario",
                            description: "El usuario al que le cambiarás el dinero",
                            required: true
                        },
                        {
                            type: ApplicationCommandOptionType.Integer,
                            name: "cantidad",
                            description: "La cantidad de dinero que le fijarás",
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "setup",
            description: "Iniciar la economia"
        }
    ]
}