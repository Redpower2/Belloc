import { Schema, model } from "mongoose";

const inventarioSchema = new Schema<ItemInv>(
    {
        id: {
            type: Number,
            required: true
        },
        alias: {
            type: String,
            required: true
        },
        subId: {
            type: String,
            required: true
        },
        equipado: {
            type: Boolean,
            required: true
        },
        durabilidadActual: {
            type: Number,
            required: true
        },
    }
)

const usuarioSchema = new Schema<Usuario>(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        nombre: {
            type: String,
            required: true
        },
        dinero: {
            type: Number,
            required: true,
            default: 0
        },
        banco: {
            type: Number,
            required: true,
            default: 0
        },
        inventario: [inventarioSchema],
        trabajo: {
            type: Number,
            required: true,
            default: 0
        }
    }
);

export const Usuarios = model("Usuario", usuarioSchema);

export type UsuarioDB = InstanceType<typeof Usuarios>;