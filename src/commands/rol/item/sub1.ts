import { ChatInputCommandInteraction, EmbedBuilder, MessageFlags } from "discord.js";
import { Items } from "../../../schemas/item";
import { colores } from "../../../utils/general/colores";
import { aMayusculas } from "../../../utils/general/aMayusculas";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { responder } from "../../../utils/general/responder";

export async function info(interaction: ChatInputCommandInteraction)
{
    const { options } = interaction;
    const nombre = options.getString("nombre");
    const id = options.getInteger("id");
    const subId = options.getString("sub-id");
    if(options.data.length > 1 || !options.data.length)
    {
        return await responder(interaction, {
            content: "Parametros invalidos",
            flags: MessageFlags.Ephemeral
        });
    }
    if(nombre && nombre === "### ELIMINADO ###")
    {
        return await responder(interaction, {
            content: "No.",
            flags: MessageFlags.Ephemeral
        })
    }
    const item = await Items.findOne({ nombre }) ?? await Items.findOne({ id });
    if(item)
    {
        let stats = "Sin stats"
        if(item.stats)
        {
            const statsArray = Object.entries(item.stats);
            stats = statsArray
                .map(s => 
                {
                    if(s[1])
                    {
                        return `${aMayusculas(s[0])}: ${s[1]}`
                    }
                })
                .join("\n");
        }
        const embed = new EmbedBuilder()
            .setTitle(`${item.nombre} [${item.id}]`)
            .setImage(
                item.imagen
                    ? item.imagen
                    : "https://img.icons8.com/m_sharp/1200/no-image.jpg"
            )
            .setDescription(`${item.descripcion ?? "Sin descripcion"}`)
            .addFields(
                {
                    name: "Usable",
                    value: item.uso
                        ? "Sí"
                        : "No",
                    inline: true
                },
                {
                    name: "Durabilidad",
                    value: item.durabilidad !== -1
                        ? item.durabilidad.toString()
                        : "No",
                    inline: true
                },
                {
                    name: "Stats",
                    value: stats.length > 2
                        ? stats
                        : "Sin stats",
                    inline: true
                }
            )
            .setColor(colores.economia);
        return await responder(interaction, {
            embeds: [embed]
        });
    }
    else
    {
        const usuario = await UsuarioManager.obtener(interaction.user);
        const item = usuario.inventario.find(i => i.subId === subId);
        if(!item)
        {
            return await responder(interaction, {
                content: "No hay ningun item con ese subId",
                flags: MessageFlags.Ephemeral
            });
        }
    }    
}