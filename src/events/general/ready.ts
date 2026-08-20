import { client } from "../../client";

client.once("clientReady", 
    function() 
    {
        return console.log("¡El bot está prendido!");
    }
);