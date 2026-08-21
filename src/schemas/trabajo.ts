import { Schema, model } from "mongoose";

const trabajoSchema = new Schema<Trabajo>(
    {
        nombre: {
            type: String,
            required: true
        },
        salario: {
            type: Number,
            required: true
        },
        mecanica: {
            type: Boolean,
            required: true
        }
    }
);

export const Trabajos = model<typeof trabajoSchema>("Trabajo", trabajoSchema)