import { Schema, model } from "mongoose";

const personajeSchema = new Schema<Personaje>(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        userId: {
            type: String,
            required: true
        },
        alias: {
            type: String,
            required: true
        },
        raza: {
            type: Number,
            required: true
        }
    }
)

export const Personajes = model<typeof personajeSchema>("Personaje", personajeSchema)