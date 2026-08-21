import { numeroRandom } from "./numeroRandom"

export const colores = {
    personaje: 0x00AAE4,  //Celeste
    falloSuave: 0xff4500, //Naranja
    falloMedio: 0x880808, //Rojo oscuro
    falloFuerte: 0xFF0000, //Rojo
    exitoSuave: 0x7AFF01, //Verde fluorescente 
    exitoMedio: 0x0CD00C, //Verde bosque
    exitoFuerte: 0x00FF00, //Verde
    estadoIntermedio: 0xFFA500,
    especial: 0x4C2882, //Violeta
    neutral: 0xEEF0F6, //Gris
    advertencia: 0xFFFF00,
    economia: 0xfcd35f,
    negro: 0x000001,
    random()
    {
        return numeroRandom(0xFFFFFF)
    } 
}
