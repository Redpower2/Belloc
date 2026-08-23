import { readdirSync, existsSync } from "fs";

import { join } from "path";

import { pathToFileURL } from "url";

import { ChatInputCommandInteraction, REST, Routes, SlashCommandBuilder } from "discord.js";

import { config } from "../config";

import { ComandosAyuda } from "../types/ComandosAyuda";

const rootPath = __dirname;

type Logic = (interaction: ChatInputCommandInteraction) => Promise<void>;

interface Command
{
    data: SlashCommandBuilder;
    execute: Logic;
    ayuda: ComandosAyuda;
    subs: Record<string, Logic>;
};

export const commandList: Record<string, Command> = {};

export async function deployCommands()
{
    const rootFolders = readdirSync(rootPath).filter(folder => !folder.match("index.ts")  && !folder.match("index.js"));

    for(const folder of rootFolders)
    {
        const categoryPath = join(rootPath, folder);
        const commandsFolders = readdirSync(categoryPath);
        for(const commandFolder of commandsFolders)
        {
            const getFileURL = function(fileName:string)
            {
                const extensions =  [".ts", ".js"];

                const extFound = extensions.find(ext => existsSync(join(categoryPath, commandFolder, `${fileName}${ext}`)));

                const fullPath = join(categoryPath, commandFolder, `${fileName}${extFound}`);
                return pathToFileURL(fullPath).href;
            }


            const [logic, slash, datos] = await Promise.all([
                import(getFileURL("logica")),
                import(getFileURL("slash")),
                import(getFileURL("datos"))
            ]);

            if(logic.execute && slash.data && datos.ayuda)
            {
                const name = slash.data.name;
                commandList[name] = {
                    execute: logic.execute,
                    data: slash.data,
                    ayuda: datos.ayuda,
                    subs: {}
                };
                for(let i = 1 ; i < 125 ; i++)
                {
                    const subcomando = await import(getFileURL(`sub${i}`))
                    .catch(() => null);
                    if(!subcomando)
                    {
                        break;
                    }
                    for(const funcion of Object.values(subcomando) as Logic[])
                    {
                        commandList[name].subs[funcion.name] = funcion;
                    }
                }
            }
        }
    }
    const commandsData = Object.values(commandList).map(command => command.data);

    const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);
    console.log("Refrescando comandos de barra (/)");
    const inserto = await rest.put(
        Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, config.DISCORD_SERVER_ID),
        {
            body: commandsData,
        }
    ).catch(() => 
    {
        console.error();
        return null;
    });
    
    if(!inserto)
    {
        return;
    }

    console.log("Se han recargado los comandos de barra (/)");
}