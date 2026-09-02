import { ChatInputCommandInteraction, CommandInteractionOptionResolver, MessageFlags } from "discord.js";
import { UsuarioManager } from "../../../economy/UsuarioManager";
import { UsuarioEconomy } from "../../../economy/UsuarioEconomy";
import { responder } from "../../../utils/general/responder";

export async function dar(interaction: ChatInputCommandInteraction)
{
    const options = interaction.options as CommandInteractionOptionResolver;
    const userDisc = options.getUser("usuario", true);
    const nombre = options.getString("nombre");
    const subId = options.getString("sub-id");
    if(nombre && subId || !options.data.length)
    {
        return await responder(interaction, {
            content: "Parametros inválidos",
            flags: MessageFlags.Ephemeral
        });
    }
    const prm1 = nombre
        ? "alias"
        : "subId"
    const prm2 = nombre ?? subId;
    const cantidad = interaction.options.getInteger("cantidad") ?? 1;
    const usuario1 = await UsuarioManager.obtener(interaction.user);
    const usuario2 = await UsuarioManager.obtener(userDisc);
    const items = await UsuarioEconomy.transferiritem(usuario1, usuario2, prm1, prm2!, cantidad);
    if(!items)
    {
        return await responder(interaction, {
            content: "¡Cantidad inválida!",
            flags: MessageFlags.Ephemeral
        });
    }
    return await responder(interaction, {
        content: `${cantidad} ${items[0].alias} dados a <@${userDisc.id}>`
    });
}