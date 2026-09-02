import { MessageFlags, RepliableInteraction, TextDisplayBuilder } from "discord.js";
import { responder } from "../../utils/general/responder";
import { UsoEntidad } from "../../types/UsoEntidad";

export const general: UsoEntidad = {
    async funcion(interaction: RepliableInteraction, usable: ItemInv, cantidad: number)
    {
        return responder(interaction, {
            components: [
                new TextDisplayBuilder({ content: `¡Usaste ${cantidad} ${usable.alias}s!` })
            ],
            flags: MessageFlags.IsComponentsV2
        })
    },
    multiple: true
}