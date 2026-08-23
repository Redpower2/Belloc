import { ComandosAyuda } from "../../../types/ComandosAyuda";
import { colores } from "../../../utils/general/colores";


export const ayuda: ComandosAyuda = {
    nombre: "Lista",
    descripcion: "Listado de los elementos que selecciones.",
    emoji: "📋",
    subcomandos: [
        {
            nombre: "usuarios",
            descripcion: "Los usuarios que participaron de la economia",
            emoji: "🗣️"
        }
    ],
    color: colores.especial
}