//Tengo que poner lo de paginado en inventario y tambien
//Ver de agrupar varios iguales en uno mismo porque si no es un quilombo
//Tambien manejar lo de info y lo de usar
import { ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ContainerBuilder, MessageFlags, SectionBuilder, TextDisplayBuilder } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { colores } from "../../../utils/general/colores";
import { Items } from "../../../schemas/item";


export async function execute(interaction: ChatInputCommandInteraction)
{
    const userDisc = interaction.options.getUser("usuario") ?? interaction.user;
    const usuario = await UsuarioManager.obtener(userDisc);
    const { inventario } = usuario;
    const container = new ContainerBuilder()
        .setAccentColor(colores.especial)
        .addTextDisplayComponents(display => display.setContent(`## Inventario de ${usuario.nombre}`));
    if(inventario.length)
    {
        for(const item of inventario)
        {
            const equipadoText = item.equipado
                ? " (Equipado)"
                : "";
            const section = new SectionBuilder()
                .addTextDisplayComponents(display => display.setContent(item.alias+equipadoText))
                .setButtonAccessory(
                    new ButtonBuilder()
                        .setCustomId(`item_${item.id}_${item.subId}`)
                        .setLabel("Info")
                        .setEmoji("🔍")
                        .setStyle(ButtonStyle.Primary)
                )
            if(item.durabilidadActual)
            {
                const niveles = ["⬛","🟥","🟨","🟩"];
                const itemDB = await Items.findOne({
                    id: item.id
                });
                if(!itemDB)
                {
                    continue;
                }
                const porcentaje = item.durabilidadActual / itemDB.durabilidad * 100;
                const llenos = Math.round(porcentaje / 100 * 6);
                const color = porcentaje > 50 
                    ? niveles[3] 
                    : porcentaje > 25 
                    ? niveles[2] 
                    : niveles[1];

                const barra = color.repeat(llenos) + niveles[0].repeat(6 - llenos);

                section.addTextDisplayComponents(display => display.setContent(`-# ${barra}`))
            }
            container
                .addSectionComponents(section);
        }
    }
    else
    {
        container
            .addTextDisplayComponents(display => display.setContent("No hay items disponibles para mostrar."))
    }
    return await interaction.reply({
        components: [container],
        flags: MessageFlags.IsComponentsV2
    });
}