import { ChatInputCommandInteraction } from "discord.js";
import { numeroRandom } from "../../../utils/general/numeroRandom";

const defolt = ["Quiero tetas.", "¿Qué significa el bro respeta?", "https://images-ext-1.discordapp.net/external/tILJSgZwXWhAkf9YFqesd7o0tXSEaXmBEHgp7qsXILA/https/www.unbosque.edu.co/sites/default/files/2025-04/Facultad.gif", "Cállate.", "Os follaré con la polla"];

//me da miedo que me reporten el bot o que raideen con él, yo dejaria hacer quilombo eh
const filtro = ["http", "@", "nigger", "nazi", "hitler", "nigga", "fag", "foid", "cp", "infantil", "judío", "judio"]


export async function execute(interaction: ChatInputCommandInteraction)
{
    const dicho = interaction.options.getString("dicho");
    if(dicho)
    {
        const dichito = dicho.toLowerCase()
        if(filtro.some(palabra =>  dichito.includes(palabra)))
        {
            return await interaction.reply({
                content: "Yo soy un tipo educado, no voy a repetir esas cosas."
            });
        }
        return await interaction.reply({
            content: dicho
        });
    }
    else
    {
        const random = numeroRandom(defolt.length);
        return await interaction.reply({
            content: defolt[random]
        });
    }
}