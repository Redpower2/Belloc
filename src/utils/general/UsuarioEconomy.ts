import { UsuarioDB } from "../../schemas/usuario";

type Propiedad = "banco" | "dinero"

export const UsuarioEconomy = {
    async dardinero(usuario: UsuarioDB, cantidad: number, propiedad: Propiedad = "dinero")
    {
        await usuario.updateOne({
            $inc: {
                [propiedad]: cantidad
            }
        });
        return usuario[propiedad] + cantidad;
    },
    async quitardinero(usuario: UsuarioDB, cantidad: number, propiedad: Propiedad = "dinero")
    {
        if(usuario[propiedad] < cantidad)
        {
            return null;
        }
        await usuario.updateOne({
            $inc: {
                [propiedad]: -cantidad
            }
        });
        return usuario[propiedad] - cantidad;
    },
    async fijardinero(usuario: UsuarioDB, cantidad: number, propiedad: Propiedad = "dinero")
    {
        await usuario.updateOne({
            $set: {
                [propiedad]: cantidad
            }
        });
        return cantidad;
    }
};