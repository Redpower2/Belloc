interface TiendaItem
{
    id: number;
    nombre: string;
    emoji: string;
    precio: number;
    descuento?: number;
    relacion: "comprable" | "vendible";
}

interface TiendaItemOptions
{
    id?: number;
    nombre?: string;
    emoji?: string;
    precio?: number;
    descuento?: number;
    relacion?: "comprable" | "vendible";
}