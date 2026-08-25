import { ChatInputCommandInteraction } from "discord.js";
import { Combates } from "../../../schemas/combate";
import { Items } from "../../../schemas/item";
import { Personajes } from "../../../schemas/personaje";
import { Usuarios } from "../../../schemas/usuario";

export async function setup(interaction: ChatInputCommandInteraction)
{
    await Combates.deleteMany({});
    await Items.deleteMany({});
    await Personajes.deleteMany({});
    await Usuarios.deleteMany({});
    return await interaction.reply({
        content: `Base de datos seteada.`,
        files: [{
            name: "metroliaron.jpg",
            attachment: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjUHZs7hqUP4aNw_t3McnP7aUsm8MCu4fE1exeg9D_o9CdQsBYZAE8KTo&s=10"
        }]
    });
}