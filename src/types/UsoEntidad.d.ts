interface UsoEntidad
{
    funcion(interaction: ChatInputCommandInteraction | MessageComponentInteraction, usable: ItemInv, cantidad?: number): any,
    multiple?: boolean,
    evento?: boolean
}