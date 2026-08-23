import { ComandosAyuda } from "../../../types/ComandosAyuda";
import { colores } from "../../../utils/general/colores";


export const ayuda: ComandosAyuda = {
    nombre: "Dinero",
    descripcion: "Comando en progreso. No está listo para su uso. Creado: 2026-08-23",
    emoji: "💰",
    subcomandos: [
        {
            nombre: "ver",
            descripcion: "Ver el dinero del usuario",
            emoji: "💰"
        },
        {
            nombre: "dar",
            descripcion: "Dar dinero a un usuario",
            emoji: "💸"
        }
    ],
    color: colores.economia
}