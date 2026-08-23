import { Schema, model } from "mongoose";

const participanteSchema = new Schema<Participante>(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        ataque: {
            type: Number,
            required: true,
            default: 1
        },
        defensa: {
            type: Number,
            required: true,
            default: 0
        },
        vida: {
            type: Number,
            required: true,
            default: 5
        },
        estados: [
            {
                indice: Number,
                inicio: Number,
                fin: Number,
                activo: Boolean
            }
        ]
    }
)

const combateSchema = new Schema<Combate>({
    participantes: [participanteSchema],
    turno: {
        type: Number,
        required: true
    },
    canal: {
        type: String,
        required: true,
        unique: true
    }
});

export const Combates = model<typeof combateSchema>("Combate", combateSchema)