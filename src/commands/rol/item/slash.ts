import { ApplicationCommandOptionType, ChatInputApplicationCommandData } from "discord.js";


export const data: ChatInputApplicationCommandData = {
    name: "item",
    description: "Comandos de items",
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "info",
            description: "Información sobre un item",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "nombre",
                    description: "Nombre del Item (EXCLUYENTE CON ID Y SUBID)"
                },
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "id",
                    description: "Id del item (EXCLUYENTE CON NOMBRE Y SUBID)"
                },
                {
                    type: ApplicationCommandOptionType.String,
                    name: "sub-id",
                    description: "SubId de un item de tu inventario (EXCLUYENTE CON ID Y NOMBRE)"
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "dar",
            description: "Darle un item a otro usuario",
            options: [
                {
                    type: ApplicationCommandOptionType.User,
                    name: "usuario",
                    description: "Usuario al que le darás el item",
                    required: true
                },
                {
                    type: ApplicationCommandOptionType.String,
                    name: "nombre",
                    description: "Nombre del Item (EXCLUYENTE CON SUBID)"
                },
                {
                    type: ApplicationCommandOptionType.String,
                    name: "sub-id",
                    description: "SubId de un item de tu inventario (EXCLUYENTE CON NOMBRE)"
                },
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "cantidad",
                    description: "Cantidad de items a dar"
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "renombrar",
            description: "Renombrar un item de tu inventario",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "nombre_nuevo",
                    description: "Nuevo nombre del item",
                    required: true
                },
                {
                    type: ApplicationCommandOptionType.String,
                    name: "nombre_viejo",
                    description: "Nombre del Item (EXCLUYENTE CON SUBID)"
                },
                {
                    type: ApplicationCommandOptionType.String,
                    name: "sub-id",
                    description: "SubId de un item de tu inventario (EXCLUYENTE CON NOMBRE)"
                }
            ]
        },    
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "usar",
            description: "Usar un item de tu inventario",
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: "nombre",
                    description: "Nombre del Item (EXCLUYENTE CON SUBID)"
                },
                {
                    type: ApplicationCommandOptionType.String,
                    name: "sub-id",
                    description: "SubId de un item de tu inventario (EXCLUYENTE CON NOMBRE)"
                },
                {
                    type: ApplicationCommandOptionType.Integer,
                    name: "cantidad",
                    description: "Cantidad de items que querés usar"
                }
            ]
        },    
    ]
}