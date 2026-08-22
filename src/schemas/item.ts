import { Schema, model } from "mongoose";


const itemSchema = new Schema<Item>(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        imagen: {
            type: String,
            required: true
        },
        uso: {
            type: String,
            required: true
        },
        durabilidad: {
            type: Number,
            required: true
        },
        stats: {
            daño: Number,
            defensa: Number,
            dado: Number
        }
    }
);

export const Items = model<typeof itemSchema>("Item", itemSchema)