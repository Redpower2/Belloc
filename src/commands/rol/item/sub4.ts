import { ChatInputCommandInteraction, CommandInteractionOptionResolver, MessageFlags } from "discord.js";

export async function usar(interaction: ChatInputCommandInteraction)
{
    const options = interaction.options as CommandInteractionOptionResolver;
    const nombre = options.getString("nombre");
    const subId = options.getString("sub-id");
    const cantidad = options.getInteger("cantidad") ?? 1;
    if(nombre && subId || !options.data.length)
    {
        return await interaction.reply({
            content: "Parametros inválidos",
            flags: MessageFlags.Ephemeral
        })
    }
}