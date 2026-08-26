import { ChatInputCommandInteraction } from "discord.js";
import { Items } from "../../../schemas/item";
import { Usuarios } from "../../../schemas/usuario";

export async function borrarItem(interaction: ChatInputCommandInteraction)
{
    const id = interaction.options.getInteger("id", true);
    const item = await Items.findOne({
        id 
    });
    if(!item || item.nombre === "### ELIMINADO ###")
    {
        return await interaction.reply({
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
    return await interaction.reply({
        content: `Item "${item.nombre}" borrado. El \`ID: ${id}\` queda liberado.`
    });
}