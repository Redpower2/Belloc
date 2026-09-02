import { Schema, model } from "mongoose";


const tiendaItemSchema = new Schema<TiendaItem>(
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
        emoji: {
            type: String,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        descuento: {
            type: Number
        },
        relacion: {
            type: String,
            required: true,
            enum: ["comprable", "vendible"]
        }
    }
);

export const TiendaItems = model("TiendaItem", tiendaItemSchema);

export type ItemDB = InstanceType<typeof TiendaItems>;