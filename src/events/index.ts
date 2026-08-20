import { readdirSync } from 'fs'
import { join } from 'path';
import { pathToFileURL } from 'url';

//Esta sería la importación de los eventos al bot.ts

export async function cargarEventos()
{
    const rootPath = __dirname;
    const rootFolders = readdirSync(rootPath).filter(
        function(folder)
        {
            return  !folder.match("index.ts")  && !folder.match("index.js");
        }
    );

    for(const folder of rootFolders)
    {
        const eventPath = join(rootPath, folder);
        const events = readdirSync(eventPath)

        for(const event of events)
        {
            const rutaFinal = pathToFileURL(join(eventPath, event)).href;
            await import(rutaFinal);
        }
    }
}