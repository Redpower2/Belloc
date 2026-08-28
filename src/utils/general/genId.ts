import { Usuarios } from "../../schemas/usuario";
import { ABECEDARIO } from "./abecedario";
import { numeroRandom } from "./numeroRandom";

export async function genId()
{
    let idGen = "";
    let registrado = true;
    while(registrado)
    {
        idGen = "";
        for(let j = 0 ; j < 4 ; j++)
        {
            const eleccion = numeroRandom(1);
            switch(eleccion)
            {
                case 0:
                    idGen += ABECEDARIO[numeroRandom(27)]
                break;
                case 1:
                    idGen += numeroRandom(10)
                break;
            }
        }
        const idExistente = await Usuarios.findOne({
            "inventario.estancias.subId": idGen
        });
        if(!idExistente)
        {
            registrado = false;
        }
    }
    return idGen
}