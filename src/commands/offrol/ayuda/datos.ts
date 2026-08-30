import { ComandosAyuda } from "../../../types/ComandosAyuda";
import { colores } from "../../../utils/general/colores";

export const ayuda: ComandosAyuda = {
    nombre: "Ayuda",
    descripcion: "¡Este comando!",
    emoji: "📚",
    subcomandos: [
        {
            nombre: "General",
            descripcion: "Ver todos los comandos del servidor que el usuario común puede usar.",
            emoji: "📚"
        },
        {
            nombre: "Staff",
            descripcion: "Los comandos del staff, que solo pueden verlos ellos",
            emoji: "🕵️"
        },
        {
            nombre: "Comando",
            descripcion: "Ver los subcomandos de un comando",
            emoji: "📝"
        }
    ],
    color: colores.neutral
}