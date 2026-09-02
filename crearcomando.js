const fs = require('fs');
const path = require('path');

const categoria = process.argv[2]
if(!categoria || categoria !== "offrol" && categoria !== "rol")
{
    console.error("Uso del comando: node crearcomando.js <offrol | rol> <nombre>");
    process.exit(1);
}

const nombreComando = process.argv[3].toLowerCase();
if(!nombreComando)
{
    console.error("Falta el nombre del comando a crear.");
    process.exit(1);
}

const carpeta = path.join(__dirname, 'src', 'commands', categoria, nombreComando);

fs.mkdirSync(carpeta, { recursive: true });

const datos = path.join(carpeta, "datos.ts");

const logica = path.join(carpeta, "logica.ts");

const slash = path.join(carpeta, "slash.ts");

const nombreMayusculas = nombreComando[0].toUpperCase() + nombreComando.slice(1)

fs.writeFileSync(datos,
`import { ComandosAyuda } from "../../../types/ComandosAyuda";


export const ayuda: ComandosAyuda = {
    nombre: "${nombreMayusculas}",
    descripcion: "Comando en progreso. No está listo para su uso. Creado: ${new Date().toISOString().split('T')[0]}",
    emoji: "❓"
}`
);

fs.writeFileSync(logica,
`import { ChatInputCommandInteraction } from "discord.js";
import { responder } from "../../../utils/general/responder";


export async function execute(interaction: ChatInputCommandInteraction)
{
    return await responder(interaction, {
        content: "Comando en progreso",
        flags: 64
    });
}`
);

fs.writeFileSync(slash,
`import { ChatInputApplicationCommandData } from "discord.js";


export const data: ChatInputApplicationCommandData = {
    name: "${nombreComando}",
    description: "Comando en progreso. NO USAR."
}`
);

console.log(`${nombreComando} creado en ${carpeta}!`)