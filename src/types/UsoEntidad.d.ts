interface UsoEntidad
{
    funcion(interaction: ChatInputCommandInteraction, usuario: Usuario, usable: ItemInv, cantidad?: number): any,
    multiple?: boolean,
    evento?: boolean
}