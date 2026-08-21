import { client } from "../../client";
import { commandList } from "../../commands";

client.on("interactionCreate", 
    async function(interaction) 
    {
        if(!interaction.isChatInputCommand()) 
        {
            return;
        }

        const { commandName } = interaction;

        if(commandList[commandName]) 
        {
            const grupo = interaction.options.getSubcommandGroup(false);
            const subcomando = interaction.options.getSubcommand(false);
            const comando = await commandList[commandName].execute(interaction);
            if(subcomando && comando === undefined)
            {
                const llave = grupo 
                    ? `${subcomando}${grupo.charAt(0).toUpperCase() + grupo.slice(1)}` 
                    : subcomando;
                return await commandList[commandName].subs[llave](interaction);
            }
        }
    }
);