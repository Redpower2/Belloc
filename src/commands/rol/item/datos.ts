import { ComandosAyuda } from "../../../types/ComandosAyuda";
import { colores } from "../../../utils/general/colores";


export const ayuda: ComandosAyuda = {
    nombre: "Item",
    descripcion: "Comandos de un item de tu inventario",
    emoji: "🛠️",
    subcomandos: [
        {
            nombre: "Info",
            descripcion: "Comando de información",
            emoji: "👁️"
        },
        {
            nombre: "Dar",
            descripcion: "Dar item a un usuario",
            emoji: "🫴"
        },
        {
            nombre: "Renombrar",
            descripcion: "Cambiarle el alias a tu item",
            emoji: "🎨"
        },
        {
            nombre: "Usar",
            descripcion: "Usar un item",
            emoji: "💡"
        }
    ],
    color: colores.especial
}