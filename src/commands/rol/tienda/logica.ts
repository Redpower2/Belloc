import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ContainerBuilder, LabelBuilder, MessageFlags, ModalBuilder, SectionBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, TextInputStyle } from "discord.js";
import { responder } from "../../../utils/general/responder";
import { MINUTO } from "../../../utils/general/tiempo";
import { armarTienda } from "../../offrol/manager/sub8";
import { colores } from "../../../utils/general/colores";
import { TiendaItems } from "../../../schemas/tiendaItem";
import { TextInputBuilder } from "@discordjs/builders";
import { esNumero } from "../../../utils/general/esNumero";
import { UsuarioEconomy } from "../../../economy/UsuarioEconomy";
import { UsuarioManager } from "../../../economy/UsuarioManager";

function calcularPrecio(item: TiendaItem)
{
    const { precio } = item;
    const descuento = item.descuento ?? 0;
    return Math.floor(precio * (1 - descuento / 100));
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
                    .setContent("## Sin items en la tienda")
            )
    }
    else
    {
        tienda.forEach(i => 
        {
            const precio = calcularPrecio(i)
            const boton = new ButtonBuilder()
                .setCustomId(`item-${i.id}`)
            if(i.relacion === "comprable")
            {
                boton
                    .setStyle(ButtonStyle.Success)
                    .setLabel(`Comprar 🪙${precio}`)
            }
            else
            {
                boton
                    .setStyle(ButtonStyle.Primary)
                    .setLabel(`Vender 🪙${precio}`)
            }
            const content = [`${i.nombre}${i.emoji}`];
            if(i.descuento)
            {
                content.push(`\n(-${i.descuento}%)`);
            }
            container
                .addSectionComponents(
                    new SectionBuilder()
                        .addTextDisplayComponents(display => display.setContent(content.join("")))
                        .setButtonAccessory(boton)
                );
        })
    }
    const components = []
    components.push(container);
    const row = new ActionRowBuilder<ButtonBuilder>()
    if(tiendas.length > 1)
    {
        row
            .setComponents(
                new ButtonBuilder()
                    .setCustomId("paginaminus")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("⬅️"),
                new ButtonBuilder()
                    .setCustomId("paginazero")
                    .setEmoji("🔄️")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("paginaplus")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("➡️")
            );
        components.push(row);
    }
    return await responder(interaction, {
        components,
        flags: MessageFlags.IsComponentsV2
    });
}


export async function execute(interaction: ChatInputCommandInteraction)
{
    const usuario = await UsuarioManager.obtener(interaction.user);
    let indice = 0;
    const tiendas = await armarTienda();
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
            case "paginaminus":
                indice -= 1
                if(indice < 0)
                {
                    indice = tienda.length - 1
                }
            break;
            case "paginazero":
                indice = 0;
            break;
            case "paginaplus":
                indice += 1
                if(indice > tienda.length - 1)
                {
                    indice = 0;
                }
            break;
            default:
                const id = Number(b.customId.replace("item-", ""));
                const itemTienda = tienda.find(i => i.id === id);
                if(!itemTienda)
                {
                    return responder(b, {
                        content: "¡Ese item no está en la tienda! Extrañamente."
                    });
                }
                const modal = new ModalBuilder()
                    .setCustomId("modal")
                    .setTitle(`${itemTienda.nombre}`)
                    .addLabelComponents(
                        new LabelBuilder()
                            .setLabel("Cantidad")
                            .setTextInputComponent(
                                new TextInputBuilder()
                                    .setCustomId("cantidad")
                                    .setPlaceholder("1")
                                    .setStyle(TextInputStyle.Short)
                                    .setValue("1")
                                    .setRequired(true)
                            )
                    );
                b.showModal(modal);
                const modalEnviado = await b.awaitModalSubmit({
                    filter: i => i.user.id === interaction.user.id,
                    time: 5 * MINUTO
                }).catch(() => null);
                if(!modalEnviado)
                {
                    return;
                }
                const cantidadItem = modalEnviado.fields.getTextInputValue("cantidad");
                const cantidad = Math.floor(Number(cantidadItem));
                if(!esNumero(cantidad) || cantidad <= 0)
                {
                    return await responder(modalEnviado, {
                        content: "¡La cantidad tiene que ser un numero!",
                        flags: MessageFlags.Ephemeral
                    });
                }
                const precioFinal = calcularPrecio(itemTienda) * cantidad;
                if(itemTienda.relacion === "comprable")
                {
                    const dinero1 = await UsuarioEconomy.quitardinero(usuario, precioFinal);
                    if(dinero1 === null)
                    {
                        return await responder(modalEnviado, {
                            content: "Sin dinero."
                        });
                    }
                    await UsuarioEconomy.daritem(usuario, itemTienda, cantidad);
                    await responder(modalEnviado, {
                        content: `¡Item comprado!`,
                        flags: MessageFlags.Ephemeral
                    });
                }
                else
                {
                    const { inventario } = usuario;
                    const itemInv = inventario.find(i => i.id === itemTienda.id);
                    if(!itemInv)
                    {
                        return await responder(modalEnviado, {
                            content: "¡No tienes ese item en el inventario!",
                            flags: MessageFlags.Ephemeral
                        });
                    }
                    const itemE = await UsuarioEconomy.quitaritem(usuario, "id", itemInv.id, cantidad);
                    if(!itemE)
                    {
                        return await responder(modalEnviado, {
                            content: "Cantidad inválida."
                        });
                    }
                    await UsuarioEconomy.dardinero(usuario, precioFinal);
                    await responder(modalEnviado, {
                        content: `¡Item vendido!`,
                        flags: MessageFlags.Ephemeral
                    });
                }
            break;
        }
        await armarMensaje(interaction, tiendas, indice);
    });
    collector.on("end", async (_, reason) => 
    {
        if(reason === "time")
        {
            return responder(interaction, {
                components: [
                    new TextDisplayBuilder()
                        .setContent("Tiempo finalizado para ver la tienda.")
                ],
                flags: MessageFlags.IsComponentsV2
            });
        }
    });
}