interface Estado
{
    nombre: string;
    final: number;
    cooldown: number;
    efectos: {
        dado?: number;
        paralisis?: true;
        vida?: number;
        daño?: number;
    }
    intervalo?: number;
}