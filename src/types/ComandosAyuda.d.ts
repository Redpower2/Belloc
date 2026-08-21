import { ColorResolvable } from "discord.js";

interface ComandosAyuda
{
    nombre: string;
    descripcion: string;
    emoji: string;
    staff?: boolean;
    
    subcomandos?: {
        nombre: string;
        descripcion: string;
        emoji: string;
    }[]
    
    color?: ColorResolvable;
}