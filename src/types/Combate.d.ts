interface EstadoCombate
{
    id: number;
    inicio: number;
}

interface Participante
{
    id: number; //0 si es custom
    ataque: number;
    defensa: number;
    vida: number;
    estados: Estado[]
}

interface Combate
{
    participantes: Participante[];
    turno: number;
    canal: string; //Id
}