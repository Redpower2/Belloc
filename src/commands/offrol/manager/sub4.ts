import { ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, EmbedBuilder, FileUploadBuilder, FileUploadModalData, LabelBuilder, MessageFlags, ModalBuilder, TextInputBuilder, TextInputModalData, TextInputStyle } from "discord.js";
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
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji("✍️")
                        .setLabel("Descripción"),
                    new ButtonBuilder()
                        .setCustomId("imagen")
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji("🖼️")
                        .setLabel("Imagen")
                ]
            },
            {
                type: ComponentType.ActionRow,
                components: [
                    new ButtonBuilder()
                        .setCustomId("uso")
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji("✨")
                        .setLabel("Uso"),
                    new ButtonBuilder()
                        .setCustomId("durabilidad")
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji("⏳")
                        .setLabel("Durabilidad"),
                    new ButtonBuilder()
                        .setCustomId("stats")
                        .setStyle(ButtonStyle.Secondary)
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
        const manejarFields = (fieldNombre: string, valor: number | string) =>
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
        switch(b.customId)
        {
            case "descripcion":
                const modalDesc = new ModalBuilder()
                    .setCustomId("modaldesc")
                    .setTitle(item.nombre)
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
                await b.showModal(modalDesc);
                const modalEnviado = await b.awaitModalSubmit(
                    {
                        filter: m => m.user.id === interaction.user.id,
                        time: 60 * SEGUNDO
                    }
                )
                .catch(() => null);
                if(!modalEnviado)
                {
                    return;
                }
                await modalEnviado.deferUpdate();
                const valor1 = modalEnviado.fields.fields.first() as TextInputModalData;
                const texto = valor1.value;
                item.descripcion = texto;
                embed.setDescription(texto);
            break;
            case "imagen":
                const modalImagen = new ModalBuilder()
                    .setCustomId("modalimg")
                    .setTitle(item.nombre)
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
                await b.showModal(modalImagen);
                const modalEnviado2 = await b.awaitModalSubmit(
                    {
                        filter: m => m.user.id === interaction.user.id,
                        time: 60 * SEGUNDO
                    }
                )
                .catch(() => null);
                if(!modalEnviado2)
                {
                    return;
                }
                await modalEnviado2.deferUpdate();
                const valor2 = modalEnviado2.fields.fields.first() as FileUploadModalData;
                const imagen = valor2.attachments.first()!.url;
                item.imagen = imagen;
                embed.setThumbnail(imagen);
            break;
            case "uso":
                const modalUso = new ModalBuilder()
                    .setCustomId("modaluso")
                    .setTitle(item.nombre)
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
                await b.showModal(modalUso);
                const modalEnviado3 = await b.awaitModalSubmit(
                    {
                        filter: m => m.user.id === interaction.user.id,
                        time: 60 * SEGUNDO
                    }
                )
                .catch(() => null);
                if(!modalEnviado3)
                {
                    return;
                }
                await modalEnviado3.deferUpdate();
                const valor3 = modalEnviado3.fields.fields.first() as TextInputModalData;
                const texto2 = valor3.value;
                item.uso = texto2;
                manejarFields("Uso", texto2);
            break;
            case "durabilidad":
                const modalDurabilidad = new ModalBuilder()
                    .setCustomId("modaldurab")
                    .setTitle(item.nombre)
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
                await b.showModal(modalDurabilidad);
                const modalEnviado4 = await b.awaitModalSubmit(
                    {
                        filter: m => m.user.id === interaction.user.id,
                        time: 60 * SEGUNDO
                    }
                )
                .catch(() => null);
                if(!modalEnviado4)
                {
                    return;
                }
                await modalEnviado4.deferUpdate();
                const valor4 = modalEnviado4.fields.fields.first() as TextInputModalData;
                const valorReal = Number(valor4.value);
                if(isNaN(valorReal) || (valorReal < 0 && valorReal !== -1))
                {
                    return await modalEnviado4.followUp({
                        content: "No es un numero válido."
                    })
                }
                item.durabilidad = valorReal;
                manejarFields("Durabilidad", valorReal)
            break;
            case "stats":
                const modalStats = new ModalBuilder()
                    .setCustomId("modalstats")
                    .setTitle(item.nombre)
                    .addLabelComponents(
                        new LabelBuilder()
                            .setLabel("Daño")
                            .setTextInputComponent(
                                new TextInputBuilder()
                                    .setCustomId("daño")
                                    .setPlaceholder("0")
                                    .setStyle(TextInputStyle.Short)
                                    .setRequired(false)
                            ),
                        new LabelBuilder()
                            .setLabel("Defensa")
                            .setTextInputComponent(
                                new TextInputBuilder()
                                    .setCustomId("defensa")
                                    .setPlaceholder("0")
                                    .setStyle(TextInputStyle.Short)
                                    .setRequired(false)
                            ),
                        new LabelBuilder()
                            .setLabel("Dado")
                            .setTextInputComponent(
                                new TextInputBuilder()
                                    .setCustomId("dado")
                                    .setPlaceholder("0")
                                    .setStyle(TextInputStyle.Short)
                                    .setRequired(false)
                            )
                    );
                await b.showModal(modalStats);
                const modalEnviado5 = await b.awaitModalSubmit(
                    {
                        filter: m => m.user.id === interaction.user.id,
                        time: 60 * SEGUNDO
                    }
                )
                .catch(() => null);
                if(!modalEnviado5)
                {
                    return;
                }
                await modalEnviado5.deferUpdate();
                if(!item.stats)
                {
                    item.stats = {};
                }
                modalEnviado5.fields.fields.forEach(field => 
                {
                    const fieldReal = field as TextInputModalData;
                    if(fieldReal.value)
                    {
                        item.stats![field.customId as "daño" | "defensa" | "dado"] = Number(fieldReal.value);
                        manejarFields(aMayusculas(fieldReal.customId), fieldReal.value);
                    }
                });
            break;
            case "cancelar":
                return collector.stop("cancelar");
            case "confirmar":
                return collector.stop("confirmar");

        }
        await mensaje.edit({
            embeds: [embed]
        });
    });

    collector.on("end", async (_, reason) =>
    {
        if(item.durabilidad)
        {
            item.uso = "equipar"
        }
        switch(reason)
        {
            case "time":
            return await interaction.editReply({
                content: "¡Se acabó el tiempo!"
            });
            case "cancelar":
            return await interaction.editReply({
                content: "¡Item cancelado!",
                embeds: [],
                components: []
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
                if(item.uso)
                {
                    if(Object.keys(usoEntidades).includes(item.uso))
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
    if(nombre.length > 32)
    {
        return await interaction.reply({
            content: "Ese nombre es muy largo."
        });
    }
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

    const idLibre = await Items.findOne({ nombre: "### ELIMINADO ###" });

    const item: Item = {
        id: idLibre
            ? idLibre.id
            : await Items.countDocuments() + 1,
        nombre: nombre,
        durabilidad: -1
    };

    const embed = new EmbedBuilder({
        title: nombre,
        color: colores.advertencia
    });
    return await manejoItem(interaction, embed, item, idLibre);
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
