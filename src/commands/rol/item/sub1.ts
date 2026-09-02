import { ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, ContainerBuilder, EmbedBuilder, InteractionEditReplyOptions, InteractionReplyOptions, InteractionUpdateOptions, MessageComponentInteraction, MessageFlags, SectionBuilder } from "discord.js";
import { Items } from "../../../schemas/item";
import { colores } from "../../../utils/general/colores";
import { aMayusculas } from "../../../utils/general/aMayusculas";
import { MINUTO } from "../../../utils/general/tiempo";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { usarItem } from "./sub4";
import { UsuarioDB } from "../../../schemas/usuario";

export async function infoItem(interaction: ChatInputCommandInteraction | MessageComponentInteraction, usuario: UsuarioDB, item: ItemInv)
{
    const container = new ContainerBuilder()
        .setAccentColor(colores.economia)
        .addSectionComponents(
            new SectionBuilder()
                .addTextDisplayComponents(display => display.setContent(`## ${item.alias} [${item.subId}]`))
                .setButtonAccessory(
                    new ButtonBuilder()
                        .setCustomId(`item_${item.subId}`)
                        .setEmoji("⭐")
                        .setLabel(
                            !item.durabilidadActual
                                ? "Usar"
                                : item.equipado
                                    ? "Desequipar"
                                    : "Equipar"
                        )
                        .setStyle(item.equipado
                            ? ButtonStyle.Danger
                            : ButtonStyle.Success
                        )
                        .setDisabled(!item.usable)
                )
        )
        .addTextDisplayComponents(display => display.setContent(`-# Equipado\n${item.equipado ? "Sí" : "No"}`))
        .addTextDisplayComponents(display => display.setContent(
            `-# Durabilidad\n${item.durabilidadActual ?? "Sin"}`
        ));
    const contenido = {
        components: [container],
        flags: MessageFlags.IsComponentsV2
    }
    const mensaje = interaction.isMessageComponent()
        ? await (interaction as ButtonInteraction).editReply(contenido as InteractionEditReplyOptions)
        : interaction.replied || interaction.deferred
            ? await interaction.editReply(contenido as InteractionEditReplyOptions)
            : await interaction.reply({ ...contenido, fetchReply: true } as InteractionReplyOptions)
    
    const collector = await mensaje.awaitMessageComponent({
        filter: i => i.user.id === interaction.user.id,
        time: 5 * MINUTO
    }).catch(() => null);
    if(collector)
    {
        await collector.deferUpdate();
        return await usarItem(collector, item);
    }
}

export async function info(interaction: ChatInputCommandInteraction)
{
    const { options } = interaction;
    const nombre = options.getString("nombre");
    const id = options.getInteger("id");
    const subId = options.getString("sub-id");
    if(options.data.length > 1 || !options.data.length)
    {
        return await interaction.reply({
            content: "Parametros invalidos",
            flags: MessageFlags.Ephemeral
        });
    }
    if(nombre && nombre === "### ELIMINADO ###")
    {
        return await interaction.reply({
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
            .setTitle(`## ${item.nombre} [${item.id}]`)
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
        return await interaction.reply({
            embeds: [embed]
        });
    }
    else
    {
        const usuario = await UsuarioManager.obtener(interaction.user);
        const item = usuario.inventario.find(i => i.subId === subId);
        if(!item)
        {
            return await interaction.reply({
                content: "No hay ningun item con ese subId",
                flags: MessageFlags.Ephemeral
            });
        }
    }    
}