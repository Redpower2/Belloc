import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, ContainerBuilder, MessageFlags, SectionBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder } from "discord.js";
import { MINUTO } from "../../../utils/general/tiempo";
import { modalAñadir, modalEdit } from "./modal";
import { esNumero } from "../../../utils/general/esNumero";
import { esEmoji } from "../../../utils/general/esEmoji";
import { TiendaItems } from "../../../schemas/tiendaItem";
import { Items } from "../../../schemas/item";
import { responder } from "../../../utils/general/responder";

export async function itemsTienda(interaction: ChatInputCommandInteraction)
{
    const tienda = await TiendaItems.find({});
//Paginado
    function armarContainer(itemsTienda: TiendaItem[])
    {
        const container = new ContainerBuilder()
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent(`Tienda del servidor`)
            )
            .addSeparatorComponents(
                new SeparatorBuilder()
                    .setDivider(true)
                    .setSpacing(SeparatorSpacingSize.Small)
            )
        
        if(!itemsTienda.length)
        {
            container
                .addSectionComponents(
                    new SectionBuilder()
                        .addTextDisplayComponents(
                            new TextDisplayBuilder()
                                .setContent("## Sin items")
                        )
                        .setButtonAccessory(
                            new ButtonBuilder()
                                .setCustomId("editar-default")
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji("🛒")
                                .setLabel("Editar")
                        )
                )
        }
        else
        {
            itemsTienda.forEach(
                function(i)
                {
                    const itemText = [`### [${i.relacion}] ${i.nombre.toLowerCase()}${i.emoji} — $${i.precio}`];
                    if(i.descuento)
                    {
                        itemText.push(` (-${i.descuento})`)
                    }
                    container
                        .addSectionComponents(
                            new SectionBuilder()
                                .addTextDisplayComponents(
                                    new TextDisplayBuilder()
                                        .setContent(itemText.join(""))
                                )
                                .setButtonAccessory(
                                    new ButtonBuilder()
                                        .setCustomId(`editar-${i.nombre}`)
                                        .setStyle(ButtonStyle.Secondary)
                                        .setEmoji("🛒")
                                        .setLabel("Editar")
                                )
                        )
                }
            )
        }
        return container;
    }
    let container = armarContainer(tienda);
    const row = new ActionRowBuilder<ButtonBuilder>()
        .setComponents(
            new ButtonBuilder()
                .setCustomId("añadiritem")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("🏷️")
                .setLabel("Añadir Item")
        )
        
    const mensaje = await responder(interaction, {
        components: [container, row],
        flags: MessageFlags.IsComponentsV2
    });
    const collector = mensaje.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter: i => i.user.id === interaction.user.id,
        time: 8 * MINUTO
    });
    collector.on("collect",
        async function(b)
        {
            await b.showModal(
                b.customId === "añadiritem"
                    ? modalAñadir
                    : modalEdit
            );
            const modalEnviado = await b.awaitModalSubmit({
                filter: i => i.user.id === interaction.user.id,
                time: 5 * MINUTO
            })
            .catch(() => null);
            if(!modalEnviado)
            {
                return console.log("!modalEnviado");
            }
            if(!modalEnviado.isFromMessage())
            {
                return;
            }
            const campos = modalEnviado.fields;
            const emoji = campos.getTextInputValue("añadiremoji");
            const precio = campos.getTextInputValue("añadirprecio");
            const precioNum = Number(precio)
            if(!esEmoji(emoji) || !esNumero(precio) || precioNum <= 0)
            {
                return await responder(modalEnviado, {
                    content: "Emoji o precio inválido",
                    flags: MessageFlags.Ephemeral
                });
            }

            if(b.customId === "añadiritem")
            {
                const nombre = campos.getTextInputValue("añadirnombre");
                const relacion = (campos.getStringSelectValues("añadirrelacion")[0] as  "comprable" | "vendible");
                const item = await Items.findOne({ nombre: nombre });
                if(!item)
                {
                    return await responder(modalEnviado, {
                        content: "Ese item no existe!",
                        flags: MessageFlags.Ephemeral
                    });
                }
                const nuevoItem: TiendaItem = {
                    nombre: nombre,
                    id: item.id,
                    emoji: emoji,
                    precio: precioNum,
                    relacion: relacion
                };
                await TiendaItems.create(nuevoItem);
                container = armarContainer(tienda);
                await modalEnviado.update({
                    components: [container, row]
                });
            }
            else if(b.customId.startsWith("editar"))
            {
                const itemNombre = b.customId.replace("editar-", "");
                const itemTienda = tienda.find(i => i.nombre === itemNombre);
                if(!itemTienda)
                {
                    return console.error("Por alguna razón, ese item no existe en la tienda.")
                }

                const retirado = campos.getCheckbox("retiraritem");
                if(retirado)
                {
                    await TiendaItems.deleteOne({
                        nombre: itemTienda.nombre
                    });
                    container = armarContainer(tienda);
                    return await modalEnviado.update({
                        components: [container, row]
                    });
                }

                const descuento = campos.getTextInputValue("añadirdescuento");
                if(descuento && itemTienda.relacion === "vendible")
                {
                    return await responder(modalEnviado, {
                        content: "¡No se puede poner descuento a un item vendible!",
                        flags: MessageFlags.Ephemeral
                    });
                }
                const descuentoNum = Number(descuento);
                if(descuentoNum >= 100 || descuentoNum <= 0)
                {
                    return await responder(modalEnviado, {
                        content: "El descuento tiene que ser entre 1 y 99.",
                        flags: MessageFlags.Ephemeral
                    });
                }

                tienda.forEach(
                    function(i)
                    {
                        if(i.nombre === itemTienda.nombre)
                        {
                            i.emoji = emoji;
                            i.precio = precioNum;
                            i.descuento = descuentoNum;
                        }
                    }
                )
                container = armarContainer(tienda);
                await modalEnviado.update({
                    components: [container, row]
                });
            }
        }
    );
    collector.on("end",
        async function(_, reason)
        {
            switch(reason)
            {
                case "time":
                    const texto = new TextDisplayBuilder()
                        .setContent("Comando finalizado.")
                    return await responder(interaction, {
                        components: [texto],
                        flags: MessageFlags.IsComponentsV2
                    });
            }
        }
    )
}