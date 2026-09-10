import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ContainerBuilder, MessageFlags, SectionBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder } from "discord.js";
import { MINUTO } from "../../../utils/general/tiempo";
import { modalAñadir, modalEdit } from "./modal";
import { esNumero } from "../../../utils/general/esNumero";
import { esEmoji } from "../../../utils/general/esEmoji";
import { TiendaItems } from "../../../schemas/tiendaItem";
import { Items } from "../../../schemas/item";
import { responder } from "../../../utils/general/responder";
import { colores } from "../../../utils/general/colores";

export async function armarTienda()
{
    let tienda = await TiendaItems.find({});
    const tiendasArray: TiendaItem[][] = [];
    let index = -1;
    for(let i = 0 ; i < tienda.length ; i++)
    {
        if(i%16 === 0)
        {
            index += 1;
            tiendasArray.push([]);
        }
        tiendasArray[index].push(tienda[i]);
    }
    return tiendasArray;
}

async function armarMensaje(interaction: ChatInputCommandInteraction, tiendas: TiendaItem[][], indice: number)
{
    let tienda = tiendas[indice];
    const container = new ContainerBuilder()
        .setAccentColor(colores.especial)
        .addTextDisplayComponents(
            new TextDisplayBuilder()
                .setContent(`# Tienda del servidor`)
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
                .setDivider(true)
                .setSpacing(SeparatorSpacingSize.Small)
        );
    if(!tiendas.length)
    {
        container
            .addTextDisplayComponents(
                new TextDisplayBuilder()
                    .setContent("## Sin items")
            )
    }
    else
    {
        tienda.forEach(i =>
        {
            const itemText = [`### [${i.relacion}] ${i.nombre}${i.emoji} — $${i.precio}`];
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
                                .setCustomId(`editar-${i.id}`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji("🛒")
                                .setLabel("Editar")
                        )
                )
        })
    }
    const row = new ActionRowBuilder<ButtonBuilder>()
    const añadirBoton = new ButtonBuilder()
        .setCustomId("añadiritem")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("🏷️");
    if(tiendas.length > 1)
    {
        row
            .setComponents(
                new ButtonBuilder()
                    .setCustomId("paginaminus")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("⬅️"),
                añadirBoton,
                new ButtonBuilder()
                    .setCustomId("paginaplus")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("➡️")
            );
    }
    else
    {
        añadirBoton
            .setLabel("Añadir Item")
        row
            .setComponents(
                añadirBoton
            );
    }
    return await responder(interaction, {
        components: [
            container, row
        ],
        flags: MessageFlags.IsComponentsV2
    });
}

export async function itemsTienda(interaction: ChatInputCommandInteraction)
{
    let indice = 0;
    let tiendas = await armarTienda();
    const mensaje = await armarMensaje(interaction, tiendas, indice);
    const collector = mensaje.createMessageComponentCollector({
        filter: i => i.user.id === interaction.user.id,
        time: 10 * MINUTO
    });
    collector.on("collect", async b => 
    {
        let tienda = tiendas[indice];
        switch(b.customId)
        {
            case "añadiritem":
                await b.showModal(modalAñadir);
                const modalEnv = await b.awaitModalSubmit({
                    filter: i => i.user.id === interaction.user.id,
                    time: 5 * MINUTO
                }).catch(() => null);
                if(!modalEnv)
                {
                    return;
                }
                const { fields } = modalEnv;
                const emoji = fields.getTextInputValue("añadiremoji");
                const precio = fields.getTextInputValue("añadirprecio");
                const precioNum = Number(precio)
                if(!esEmoji(emoji) || !esNumero(precio) || precioNum <= 0)
                {
                    return await responder(modalEnv, {
                        content: "Emoji o precio inválido",
                        flags: MessageFlags.Ephemeral
                    });
                }
                const nombre = fields.getTextInputValue("añadirnombre");
                const relacion = (fields.getStringSelectValues("añadirrelacion")[0] as  "comprable" | "vendible");
                const item = await Items.findOne({ nombre: nombre });
                if(!item)
                {
                    return await responder(modalEnv, {
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
                modalEnv.deferUpdate();
            break;
            case "paginaminus":
                indice -= 1
                if(indice < 0)
                {
                    indice = tienda.length - 1
                }
            break;
            case "paginaplus":
                indice += 1
                if(indice > tienda.length - 1)
                {
                    indice = 0;
                }
            break;
            default:
                //editar
                await b.showModal(modalEdit);
                const modalEnv2 = await b.awaitModalSubmit({
                    filter: i => i.user.id === interaction.user.id,
                    time: 5 * MINUTO
                }).catch(() => null);
                if(!modalEnv2)
                {
                    return;
                }
                const fields2 = modalEnv2.fields;
                const emoji2 = fields2.getTextInputValue("añadiremoji");
                if(emoji2 && !esEmoji(emoji2))
                {
                    return await responder(modalEnv2, {
                        content: "Emoji inválido",
                        flags: MessageFlags.Ephemeral
                    })
                }
                const precio2 = fields2.getTextInputValue("añadirprecio");
                const precioNum2 = Number(precio2)
                if(precio2 && (!esNumero(precio2) || precioNum2 <= 0))
                {
                    return await responder(modalEnv2, {
                        content: "Precio inválido",
                        flags: MessageFlags.Ephemeral
                    })
                }
                const itemId = Number(b.customId.replace("editar-", ""));
                const itemTienda = tienda.find(i => i.id === itemId);
                if(!itemTienda)
                {
                    return console.error("Por alguna razón, ese item no existe en la tienda.")
                }

                const retirado = fields2.getCheckbox("retiraritem");
                if(retirado)
                {
                    await TiendaItems.deleteOne({
                        nombre: itemTienda.nombre
                    });
                }
                else
                {
                    const descuento = fields2.getTextInputValue("añadirdescuento");
                    const descuentoNum = Number(descuento);
                    if(descuento)
                    {
                        if(descuentoNum >= 100 || descuentoNum <= 0)
                        {
                            return await responder(modalEnv2, {
                                content: "El descuento tiene que ser entre 1 y 99.",
                                flags: MessageFlags.Ephemeral
                            });
                        }
                    }
                    if(itemTienda.relacion === "vendible")
                    {
                        return await responder(modalEnv2, {
                            content: "¡No se puede poner descuento a un item vendible!",
                            flags: MessageFlags.Ephemeral
                        });
                    }

                    const itemEditado: TiendaItemOptions = {};
                    if(emoji2)
                    {
                        itemEditado.emoji = emoji2;
                    }
                    if(precio2)
                    {
                        itemEditado.precio = precioNum2;
                    }
                    if(descuento)
                    {
                        itemEditado.descuento = descuentoNum
                    }

                    await TiendaItems.updateOne(
                        {
                            id: itemId
                        },
                        itemEditado
                    );
                }
                modalEnv2.deferUpdate();
            break;
        }
        tiendas = await armarTienda();
        await armarMensaje(interaction, tiendas, indice);
    });
    collector.on("end", async (_, reason) => 
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
    })
}