import { ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, EmbedBuilder, FileUploadBuilder, FileUploadModalData, LabelBuilder, MessageFlags, ModalBuilder, SelectMenuModalData, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputBuilder, TextInputModalData, TextInputStyle } from "discord.js";
import { colores } from "../../../utils/general/colores";
import { MINUTO, SEGUNDO } from "../../../utils/general/tiempo";
import { ItemDB, Items } from "../../../schemas/item";
import { usoEntidades } from "../../../economy/usoEntidad";
import { aMayusculas } from "../../../utils/general/aMayusculas";

async function manejoItem(interaction: ChatInputCommandInteraction, embed: EmbedBuilder, item: Item, nombreDB?: ItemDB | null)
{
    const row = [
            {
                type: ComponentType.ActionRow,
                components: [
                    new ButtonBuilder()
                        .setCustomId("descripcion")
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji("✍️")
                        .setLabel("Descripción"),
                    new ButtonBuilder()
                        .setCustomId("imagen")
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji("🖼️")
                        .setLabel("Imagen")
                ]
            },
            {
                type: ComponentType.ActionRow,
                components: [
                    new ButtonBuilder()
                        .setCustomId("uso")
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji("✨")
                        .setLabel("Uso"),
                    new ButtonBuilder()
                        .setCustomId("durabilidad")
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji("⏳")
                        .setLabel("Durabilidad"),
                    new ButtonBuilder()
                        .setCustomId("stats")
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji("⚡")
                        .setLabel("Stats")
                ]
            },
            {
                type: ComponentType.ActionRow,
                components: [
                    new ButtonBuilder()
                    .setCustomId("cancelar")
                    .setStyle(4)
                    .setEmoji("✖️"),
                    new ButtonBuilder()
                    .setCustomId("confirmar")
                    .setStyle(3)
                    .setEmoji("✔️")
                ]
            }
        ]
    const mensaje = await interaction.reply({
        embeds: [embed],
        components: row
    });

    const collector = mensaje.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter: i => i.user.id === interaction.user.id,
        time: 10 * MINUTO
    });

    collector.on("collect", async b => 
    {
        const modal = new ModalBuilder()
        .setTitle(item.nombre)
        .setCustomId("modal")
        switch(b.customId)
        {
            case "descripcion":
                modal
                    .addLabelComponents(
                        new LabelBuilder()
                            .setLabel("Descripción")
                            .setTextInputComponent(
                                new TextInputBuilder()
                                .setCustomId("descripcion")
                                .setRequired(true)
                                .setStyle(TextInputStyle.Paragraph)
                            )
                    );
            break;
            case "imagen":
                modal
                    .addLabelComponents(
                        new LabelBuilder()
                            .setLabel("Imagen")
                            .setFileUploadComponent(
                                new FileUploadBuilder()
                                .setCustomId("imagen")
                                .setMaxValues(1)
                                .setRequired(true)
                            )
                    );
            break;
            case "uso":
                modal
                    .addLabelComponents(
                        new LabelBuilder()
                            .setLabel("Uso")
                            .setTextInputComponent(
                                new TextInputBuilder()
                                    .setCustomId("uso")
                                    .setPlaceholder("general")
                                    .setRequired(true)
                                    .setStyle(TextInputStyle.Short)
                            )
                    );
            break;
            case "durabilidad":
                modal
                    .addLabelComponents(
                        new LabelBuilder()
                            .setLabel("Durabilidad")
                            .setTextInputComponent(
                                new TextInputBuilder()
                                    .setCustomId("durabilidad")
                                    .setPlaceholder("-1")
                                    .setRequired(true)
                                    .setStyle(TextInputStyle.Short)
                            )
                    );
            break;
            case "stats":
                modal
                    .addLabelComponents(
                        new LabelBuilder()
                            .setLabel("Daño")
                            .setTextInputComponent(
                                new TextInputBuilder()
                                    .setCustomId("daño")
                                    .setPlaceholder("0")
                                    .setStyle(TextInputStyle.Short)
                            ),
                        new LabelBuilder()
                            .setLabel("Defensa")
                            .setTextInputComponent(
                                new TextInputBuilder()
                                    .setCustomId("defensa")
                                    .setPlaceholder("0")
                                    .setStyle(TextInputStyle.Short)
                            ),
                        new LabelBuilder()
                            .setLabel("Dado")
                            .setTextInputComponent(
                                new TextInputBuilder()
                                    .setCustomId("dado")
                                    .setPlaceholder("0")
                                    .setStyle(TextInputStyle.Short)
                            )
                    );
            break;
            case "cancelar":
                return collector.stop("cancelar");
            case "confirmar":
                return collector.stop("confirmar");

        }
        await b.showModal(modal);
        const modalEnviado = await b.awaitModalSubmit(
            {
                filter: m => m.user.id === interaction.user.id,
                time: 60 * SEGUNDO
            }
        )
        .catch(() => null);
        if(!modalEnviado)
        {
            return console.log("!modalEnviado");
        }
        await modalEnviado.deferUpdate();
        const eleccion = Array.from(modalEnviado.fields.fields)[0][1]
        let valor;
        let fieldNombre: string;
        function manejarFields(fieldNombre: string, valor: number | string)
        {
            const fieldExistente = embed.data.fields?.findIndex(f => f.name.includes(fieldNombre));
            if(fieldExistente !== -1 && fieldExistente !== undefined)
            {
                embed.spliceFields(fieldExistente, 1,
                    {
                        name: fieldNombre,
                        value: valor.toString()
                    }
                );
            }
            else
            {
                embed.addFields([
                    {
                        name: fieldNombre,
                        value: valor.toString()
                    }
                ]);
            }
        }
        switch(eleccion.customId)
        {
            case "descripcion":
                valor = (eleccion as TextInputModalData).value
                item.descripcion = valor;
                embed.setDescription(valor);
            break;
            case "imagen":
                valor = (eleccion as FileUploadModalData).attachments.values().next().value!.url
                item.imagen = valor;
                embed.setThumbnail(valor);
            break;
            case "uso":
                valor = (eleccion as TextInputModalData).value
                item.uso = valor
                fieldNombre = "Uso"
                manejarFields(fieldNombre, valor);
            break;
            default:
                valor = (eleccion as TextInputModalData).value
                const valorReal = Number(valor);
                if(isNaN(valorReal) || valorReal < 0)
                {
                    return modalEnviado.followUp({
                        content: "Valor inválido",
                        flags: MessageFlags.Ephemeral
                    })
                }
                if(!item.stats)
                {
                    item.stats = {};
                }
                item.stats[eleccion.customId as "daño" | "defensa" | "dado"] = valorReal;
                fieldNombre = `${aMayusculas(eleccion.customId)}`
                manejarFields(fieldNombre, valor);
                break;

        }
        await mensaje.edit({
            embeds: [embed]
        });
    });

    collector.on("end", async (_, reason) =>
    {
        switch(reason)
        {
            case "time":
            return await interaction.editReply({
                content: "¡Se acabó el tiempo!"
            });
            case "cancelar":
            return await interaction.editReply({
                content: "¡Item cancelado!"
            });
            case "confirmar":
                if(nombreDB)
                {
                    await nombreDB.updateOne(item);
                }
                else
                {
                    await Items.create(item);
                }
                if(item.uso && Object.keys(usoEntidades).includes(item.uso))
                {
                    embed
                    .setColor(colores.exitoMedio);
                }
                else
                {
                    embed
                    .setFooter(
                        {
                            text: "¡Ten en cuenta de que el uso no está manejado! Luego de manejar el uso, tendrás que activar por tu cuenta"
                        }
                    )
                }
            return await interaction.editReply({
                content: "¡Item creado con éxito!",
                embeds: [embed],
                components: []
            });
        }
    });
}

export async function crearItem(interaction: ChatInputCommandInteraction)
{
    const nombre = interaction.options.getString("nombre", true);
    if(nombre === "### ELIMINADO ###")
    {
        return await interaction.reply({
            content: "Nombre inválido",
            flags: MessageFlags.Ephemeral
        });
    }
    const nombreDB = await Items.findOne({
        nombre
    });

    if(nombreDB && nombreDB.nombre !== "### ELIMINADO ###")
    {
        return await interaction.reply({
            content: "¡Un item con ese nombre ya existe!",
            flags: MessageFlags.Ephemeral
        })
    }

    const item: Item = {
        id: nombreDB 
            ? nombreDB.id
            : await Items.countDocuments() + 1,
        nombre: nombre,
        durabilidad: -1
    };

    const embed = new EmbedBuilder({
        title: nombre,
        color: colores.advertencia
    });
    return await manejoItem(interaction, embed, item, nombreDB);
}

export async function editarItem(interaction: ChatInputCommandInteraction)
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
    const embed = new EmbedBuilder({
        title: item.nombre,
        color: colores.advertencia
    });
    return await manejoItem(interaction, embed, item.toObject(), item);
}
