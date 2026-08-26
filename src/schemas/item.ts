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
            type: String
        },
        imagen: {
            type: String
        },
        uso: {
            type: String
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

export const Items = model("Item", itemSchema);

export type ItemDB = InstanceType<typeof Items>;