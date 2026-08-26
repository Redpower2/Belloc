import { User } from "discord.js";
import { Usuarios } from "../schemas/usuario";

export const UsuarioManager = {
    async crear(usuario: User, trabajo: number = 0)
    {
        return await Usuarios.create({
            id: usuario.id,
            nombre: usuario.username,
            dinero: 0,
            banco: 0,
            inventario: [],
            trabajo,
            ultimoSalario: 0
        })
    },
    async borrar(usuario: User)
    {
        return await Usuarios.deleteOne({
            id: usuario.id
        });
    },
    async obtener(usuario: User)
    {
        const userDB = await Usuarios.findOne({
            id: usuario.id
        });
        if(!userDB)
        {
            return this.crear(usuario)
        }
        return userDB
    }
};