export function esperar(tiempo: number)
{
    return new Promise(function(res) 
    {
        return setTimeout(res, tiempo)
    }
    );
}