import { ComandosAyuda } from "../../../types/ComandosAyuda";
import { colores } from "../../../utils/general/colores";


export const ayuda: ComandosAyuda = {
    nombre: "Manager",
    descripcion: "Comandos del Bot Manager. Los usuarios no pueden usarlos.",
    emoji: "💼",
    staff: true,
    subcomandos: [
        {
            nombre: "setup",
            descripcion: "Para iniciar la economia o reiniciarla.",
            emoji: "💡"
        },
        {
            nombre: "usuario dardinero",
            descripcion: "Darle dinero a un usuario",
            emoji: "🧧"
        },
        {
            nombre: "usuario quitardinero",
            descripcion: "Quitarle dinero a un usuario",
            emoji: "🥀"
        },
        {
            nombre: "usuario fijardinero",
            descripcion: "Fijar el dinero de un usuario",
            emoji: "💵"
        },
        {
            nombre: "usuario darbanco",
            descripcion: "Darle dinero en el banco a un usuario",
            emoji: "💳"
        },
        {
            nombre: "usuario quitarbanco",
            descripcion: "Quitarle dinero en el banco a un usuario",
            emoji: "💸"
        },
        {
            nombre: "usuario fijarbanco",
            descripcion: "Fijar el dinero del banco de un usuario",
            emoji: "💰"
        },
        {
            nombre: "usuario borrar",
            descripcion: "Borrar los datos de ese usuario",
            emoji: "💀"
        },
        {
            nombre: "item crear",
            descripcion: "Crear un item",
            emoji: "✏️"
        },
        {
            nombre: "item editar",
            descripcion: "Editar un item ya existente",
            emoji: "✍️"
        },
        {
            nombre: "item borrar",
            descripcion: "Borrar un item de la base de datos",
            emoji: "🗑"
        },
        {
            nombre: "usuario daritem",
            descripcion: "Darle un item a un usuario",
            emoji: "🛠️"
        },
        {
            nombre: "usuario quitaritem",
            descripcion: "Quitarle un item a un usuario",
            emoji: "🔨"
        },
        {
            nombre: "usuario limpiarinv",
            descripcion: "Borrar todos los items de un usuario",
            emoji: "🧹"
        }
    ],
    color: colores.especial
}