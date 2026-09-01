interface UsoEntidad
{
    funcion(interaction: ChatInputCommandInteraction, usuario: UsuarioDB, usable: ItemInv, cantidad?: number): any,
    multiple?: boolean,
    evento?: boolean
}