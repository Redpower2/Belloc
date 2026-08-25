interface Usuario
{
    id: string;
    nombre: string;
    dinero: number;
    banco: number;
    inventario: ItemInv[];
    trabajo: number; //indice del trabajo
    ultimoSalario: number; //time
}