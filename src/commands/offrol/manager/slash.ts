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
                    name: "quitarbanco",
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
                    name: "fijarbanco",
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
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "borrar",
                    description: "Borrar el usuario de la base de datos",
                    options: [
                        {
                            type: ApplicationCommandOptionType.User,
                            name: "usuario",
                            description: "Usuario al que quieres borrar",
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.SubcommandGroup,
            name: "item",
            description: "Comandos de item",
            options: [
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "crear",
                    description: "Crear item",
                    options: [
                        {
                            type: ApplicationCommandOptionType.String,
                            name: "nombre",
                            description: "Nombre del item",
                            required: true
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "editar",
                    description: "Editar item",
                    options: [
                        {
                            type: ApplicationCommandOptionType.Integer,
                            name: "id",
                            description: "ID del item",
                            required: true
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "borrar",
                    description: "Borrar item",
                    options: [
                        {
                            type: ApplicationCommandOptionType.Integer,
                            name: "id",
                            description: "ID del item",
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