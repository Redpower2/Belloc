import { RepliableInteraction, TextDisplayBuilder } from "discord.js";
import { Usuarios } from "../../schemas/usuario";
import { responder } from "../../utils/general/responder";
import { UsoEntidad } from "../../types/UsoEntidad";

export const equipar: UsoEntidad = {
    async funcion(interaction: RepliableInteraction, usable: ItemInv, cantidad: number)
    {
        await Usuarios.updateOne(
            {
                "inventario.subId": usable.subId
            },
            {
                $set: { 
                    "inventario.$.equipado": !usable.equipado
                }
            }
        );
        const toggle = usable.equipado
            ? "Desequipaste"
            : "Equipaste"
        return responder(interaction, {
            components: [
                new TextDisplayBuilder({ content: `¡${toggle} tu ${usable.alias}! [${usable.durabilidadActual}]` })
            ]
        });
    },
    multiple: true
}