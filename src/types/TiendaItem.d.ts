interface TiendaItem
{
    id: number;
    nombre: string;
    emoji: string;
    precio: number;
    descuento?: number;
    relacion: "comprable" | "vendible";
}