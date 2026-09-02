import { ModalBuilder, LabelBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, CheckboxBuilder } from "discord.js";

export const modalAñadir = new ModalBuilder()
    .setCustomId("modalañadir")
    .setTitle("Añadir Item")
    .addLabelComponents(
        new LabelBuilder()
            .setLabel("Nombre")
            .setTextInputComponent(
                new TextInputBuilder()
                    .setCustomId("añadirnombre")
                    .setPlaceholder("Item")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
            ),
        new LabelBuilder()
            .setLabel("Emoji")
            .setTextInputComponent(
                new TextInputBuilder()
                    .setCustomId("añadiremoji")
                    .setPlaceholder("Emoji")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
            ),
        new LabelBuilder()
            .setLabel("Precio")
            .setTextInputComponent(
                new TextInputBuilder()
                    .setCustomId("añadirprecio")
                    .setPlaceholder("100")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
            ),
        new LabelBuilder()
            .setLabel("Disponibilidad")
            .setStringSelectMenuComponent(
                new StringSelectMenuBuilder()
                    .setCustomId("añadirrelacion")
                    .setOptions(
                        new StringSelectMenuOptionBuilder()
                            .setLabel("Comprable")
                            .setDescription("Si es comprable")
                            .setValue("comprable"),
                        new StringSelectMenuOptionBuilder()
                            .setLabel("Vendible")
                            .setDescription("Si es vendible")
                            .setValue("vendible")
                    )
                    .setMinValues(1)
                    .setMaxValues(1)
            )
    )


export const modalEdit = new ModalBuilder()
    .setCustomId("modaleditar")
    .setTitle("Editar Item")
    .addLabelComponents(
        new LabelBuilder()
            .setLabel("Emoji")
            .setTextInputComponent(
                new TextInputBuilder()
                    .setCustomId("añadiremoji")
                    .setPlaceholder("Emoji")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
            ),
        new LabelBuilder()
            .setLabel("Precio")
            .setTextInputComponent(
                new TextInputBuilder()
                    .setCustomId("añadirprecio")
                    .setPlaceholder("500")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
            ),
        new LabelBuilder()
            .setLabel("Descuento")
            .setTextInputComponent(
                new TextInputBuilder()
                    .setCustomId("añadirdescuento")
                    .setPlaceholder("1 al 99")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
            ),
        new LabelBuilder()
            .setLabel("Retirar")
            .setCheckboxComponent(
                new CheckboxBuilder()
                    .setCustomId("retiraritem")
            )
    )