import { ChatInputCommandInteraction, MessageComponentInteraction, ContainerBuilder, SectionBuilder, ButtonBuilder, ButtonStyle, MessageFlags, ButtonInteraction, InteractionEditReplyOptions, InteractionReplyOptions } from "discord.js";
import { UsuarioDB } from "../../schemas/usuario";
import { colores } from "./colores";
import { MINUTO } from "./tiempo";
import { usarItem } from "./usarItem";

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