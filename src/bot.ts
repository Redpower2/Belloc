import { client } from "./client";
import { deployCommands } from "./commands";
import { config } from "./config";
import { cargarEventos } from "./events";

deployCommands();

cargarEventos();

client.login(config.DISCORD_TOKEN);