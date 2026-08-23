import { client } from "../../client";

client.on("guildCreate", server => 
{
    for(const [id, canal] of server.channels.cache)
    {
        if(!canal.isSendable())
        {
            continue;
        }
        canal.send({
            content: "Que haces todo bien, bueno jaja queria contarte de que si no tenes un rol llamado Bot Manager, crealo, porque sin eso no vas a poder manejar el bot como usuario. Y metelo arriba para que los topos no lo toquen. Un saludo!"
        })
        return;
    }
});