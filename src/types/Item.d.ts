interface Item
{
    id: number;
    nombre: string;
    descripcion?: string;
    imagen?: string;
    uso?: string; //Llamada a función
    durabilidad: number; //Si es -1 significa que no tiene
    stats?: {
        daño?: number;
        defensa?: number;
        dado?: number;
    }
}