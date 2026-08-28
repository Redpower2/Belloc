import { ItemDB } from "../schemas/item";
import { UsuarioDB } from "../schemas/usuario";
import { genId } from "../utils/general/genId";

type Propiedad = "banco" | "dinero"

export const UsuarioEconomy = {
    async dardinero(usuario: UsuarioDB, cantidad: number, propiedad: Propiedad = "dinero")
    {
        if(cantidad < 0)
        {
            return null;
        }
        await usuario.updateOne({
            $inc: {
                [propiedad]: cantidad
            }
        });
        return usuario[propiedad] + cantidad;
    },
    async quitardinero(usuario: UsuarioDB, cantidad: number, propiedad: Propiedad = "dinero")
    {
        if(cantidad < 0 || usuario[propiedad] < cantidad)
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
        if(cantidad < 0)
        {
            return null;
        }
        await usuario.updateOne({
            $set: {
                [propiedad]: cantidad
            }
        });
        return cantidad;
    },
    async daritem(usuario: UsuarioDB, item: ItemDB, cantidad: number = 1)
    {
        if(cantidad <= 0)
        {
            return null;
        }
        const { id, nombre, durabilidad } = item;
        let nuevosItems: ItemInv[] = [];
        for(let i = 0 ; i < cantidad ; i++)
        {
            const fabricItem: ItemInv = {
                id: id,
                alias: nombre,
                subId: await genId()
            }
            if(durabilidad)
            {
                fabricItem.durabilidadActual = durabilidad;
                fabricItem.equipado = false;
            }
            nuevosItems.push(fabricItem);
        }
        await usuario.updateOne({
            $push: {
                inventario: {
                    $each: nuevosItems
                }
            }
        });
        return nuevosItems;
    },
    async quitaritem(usuario: UsuarioDB, item: ItemInv, cantidad: number = 1)
    {
        const { id } = item;
        const cantidadItems = usuario.inventario.filter(it => it.id === id);
        if(cantidad > cantidadItems.length || cantidad <= 0)
        {
            return null;
        }
        const itemsBorrados = cantidadItems
            .slice(0, cantidad)
            .map(it => it.subId);
        
        await usuario.updateOne({
            $pull: {
                inventario: {
                    subId: {
                        $in: itemsBorrados
                    }
                }
            }
        });
        return itemsBorrados
    },
    async transferiritem(usuario1: UsuarioDB, usuario2: UsuarioDB, item: ItemInv, cantidad: number = 1)
    {
        const { id } = item;
        const cantidadItems = usuario1.inventario.filter(it => it.id === id);
        if(cantidad > cantidadItems.length || cantidad <= 0)
        {
            return null;
        }
        const itemsTransferidos = cantidadItems
            .slice(0, cantidad)
        const subIds = itemsTransferidos
            .map(it => it.subId);
        await usuario1.updateOne({
            $pull: {
                inventario: {
                    subId: {
                        $in: subIds
                    }
                }
            }
        });
        await usuario2.updateOne({
            $push: {
                inventario: {
                    $each: itemsTransferidos
                }
            }
        });        
        return itemsTransferidos;
    }
};