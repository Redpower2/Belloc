import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, DISCORD_SERVER_ID, MONGODB_URL } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DISCORD_SERVER_ID || !MONGODB_URL) {
    throw new Error("Faltan variables pa");
}

export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    DISCORD_SERVER_ID,
    MONGODB_URL
};
