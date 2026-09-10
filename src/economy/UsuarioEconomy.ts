import { ItemDB, Items } from "../schemas/item";
import { UsuarioDB } from "../schemas/usuario";
import { ParametrosItem } from "../types/ParametrosItem";
import { genId } from "../utils/general/genId";
import { tienePropiedad } from "../utils/general/tienePropiedad";

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
    async daritem(usuario: UsuarioDB, item: ItemDB | TiendaItem, cantidad: number)
    {
        if(cantidad <= 0)
        {
            return null;
        }
        let itemReal = item;
        if(tienePropiedad(item, "precio"))
        {
            itemReal = await Items.findOne({
                id: item.id
            }) as ItemDB;
        }
        const { id, nombre, durabilidad, uso } = itemReal as ItemDB;
        let nuevosItems: ItemInv[] = [];
        for(let i = 0 ; i < cantidad ; i++)
        {
            const fabricItem: ItemInv = {
                id: id,
                alias: nombre,
                subId: await genId(),
                usable: uso
                    ? true
                    : false
            }
            if(durabilidad && durabilidad !== -1)
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
    async quitaritem(usuario: UsuarioDB, prm1: ParametrosItem, prm2: string | number, cantidad: number)
    {
        const items = usuario.inventario.filter(it => it[prm1] === prm2);
        if(cantidad > items.length || cantidad <= 0)
        {
            return null;
        }
        const itemsBorrados = items
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
    async transferiritem(usuario1: UsuarioDB, usuario2: UsuarioDB, prm1: ParametrosItem, prm2: string | number, cantidad: number)
    {
        const items = usuario1.inventario.filter(it => it[prm1] === prm2);
        if(cantidad > items.length || cantidad <= 0)
        {
            return null;
        }
        const itemsTransferidos = items
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