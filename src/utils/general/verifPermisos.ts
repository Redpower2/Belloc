import { ChatInputCommandInteraction, GuildMember, MessageFlags } from "discord.js";

export async function verifPermisos(interaction: ChatInputCommandInteraction)
{
    const miembro = interaction.member as GuildMember;
    const tieneRol = miembro.roles.cache.find(rol => rol.name === "Bot Manager");
    if(!tieneRol)
    {
        await interaction.reply({
            content: "¡No eres Bot Manager!",
            flags: MessageFlags.Ephemeral
        });
        return false;
    }
    return true;
}