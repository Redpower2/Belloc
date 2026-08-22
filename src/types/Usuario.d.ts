interface Usuario
{
    id: string;
    nombre: string;
    dinero: number;
    banco: number;
    inventario: ItemInv[];
    trabajo: number; //indice del trabajo + 1
    ultimoSalario: number; //time
}