import { ChatInputCommandInteraction } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";

export async function renombrar(interaction: ChatInputCommandInteraction)
{
    const nombre = interaction.options.getString("nombre_nuevo", true);
    if(nombre.length > 32)
    {
        return await interaction.reply({
            content: "No puedes tener un nombre tan largo."
        });
    }
    const subId = interaction.options.getString("sub-id", true);
    const usuario = await UsuarioManager.obtener(interaction.user);
    const item = usuario.inventario.find(i => i.subId === subId);
    if(!item)
    {
        return await interaction.reply({
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
    return await interaction.reply({
        content: `Renombraste tu item a ${nombre}`
    });
}