import { ChatInputCommandInteraction } from "discord.js";
import { Items } from "../../../schemas/item";
import { Usuarios } from "../../../schemas/usuario";
import { responder } from "../../../utils/general/responder";

export async function borrarItem(interaction: ChatInputCommandInteraction)
{
    const id = interaction.options.getInteger("id", true);
    const item = await Items.findOne({
        id 
    });
    if(!item || item.nombre === "### ELIMINADO ###")
    {
        return await responder(interaction, {
            content: "¡Ese item no existe!",
            flags: 64
        });
    }
    await Items.replaceOne(
        {
            id
        },
        {
            id,
            nombre: "### ELIMINADO ###",
            durabilidad: -1
        }
    );
    await Usuarios.updateMany(
        { 
            "inventario.id": id 
        },
        { 
            $pull: { 
                inventario: {
                    id 
                } 
            } 
        }
    );
//Falta el codigo de las tiendas para cuando lo haga
    return await responder(interaction, {
        content: `Item "${item.nombre}" borrado. El \`ID: ${id}\` queda liberado.`
    });
}