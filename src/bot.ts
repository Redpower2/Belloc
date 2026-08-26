import { client } from "./client";
import { deployCommands } from "./commands";
import { config } from "./config";
import { cargarUsos } from "./economy/usoEntidad";
import { cargarEventos } from "./events";

deployCommands();

cargarEventos();

cargarUsos();

client.login(config.DISCORD_TOKEN);