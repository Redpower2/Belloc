import { readdirSync } from "fs";
import { join } from "path"
import { pathToFileURL } from "url";


interface UsoEntidades
{
    [item: string]: UsoEntidad;
}

export const usoEntidades: UsoEntidades = {};

export async function cargarUsos()
{
    const rutaUso = join(__dirname, "uso");
    const archivosUso = readdirSync(rutaUso);
    for(const archivo of archivosUso)
    {
        const rutaCompleta = join(rutaUso, archivo);
        const modulo: UsoEntidades = await import(pathToFileURL(rutaCompleta).href);
        for(const [nombre, uso] of Object.entries(modulo))
        {
            usoEntidades[nombre] = uso as UsoEntidad;
        }
    }
}