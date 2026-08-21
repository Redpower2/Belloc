import { ActivityType } from "discord.js";
import { client } from "../../client";

client.once("clientReady", () => 
{
    client.user!.setActivity({
        name: "🎮 Follandome a tu madre",
        state: "Tus muertos",
        type: ActivityType.Playing
    })
    return console.log("¡El bot está prendido!");
});