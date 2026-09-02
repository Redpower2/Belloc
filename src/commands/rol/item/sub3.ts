import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { responder } from "../../../utils/general/responder";

export async function renombrar(interaction: ChatInputCommandInteraction)
{
    const nombre = interaction.options.getString("nombre_nuevo", true);
    if(nombre.length > 32)
    {
        return await responder(interaction, {
            content: "No puedes tener un nombre tan largo.",
            flags: MessageFlags.Ephemeral
        });
    }
    if(nombre === "### ELIMINADO ###")
    {
        return await responder(interaction, {
            content: "No puedes tener ese nombre.",
            flags: MessageFlags.Ephemeral
        });
    }
    const subId = interaction.options.getString("sub-id", true);
    const usuario = await UsuarioManager.obtener(interaction.user);
    const item = usuario.inventario.find(i => i.subId === subId);
    if(!item)
    {
        return await responder(interaction, {
            content: "No tenés un item con ese subId."
        });
    }
    await usuario.updateOne(
        {
            subId
        },
        {
            "interaction.$.alias": nombre
        }
    );
    return await responder(interaction, {
        content: `Renombraste tu item a ${nombre}`
    });
}