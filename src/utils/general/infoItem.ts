import { ContainerBuilder, SectionBuilder, ButtonBuilder, ButtonStyle, MessageFlags, RepliableInteraction } from "discord.js";
import { UsuarioDB } from "../../schemas/usuario";
import { colores } from "./colores";
import { MINUTO } from "./tiempo";
import { usarItem } from "./usarItem";
import { responder } from "./responder";

export async function infoItem(interaction: RepliableInteraction, usuario: UsuarioDB, item: ItemInv)
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
    const mensaje = await responder(interaction, {
        components: [container],
        flags: MessageFlags.IsComponentsV2
    })
    
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