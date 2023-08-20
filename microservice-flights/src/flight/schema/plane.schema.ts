import * as mongoose from 'mongoose';

export const PlaneSchema = new mongoose.Schema({
  modelo: { type: String, required: true },
  matricula: { type: String, required: true },
  aerolinea: { type: String, required: true },
  capacidad: { type: Number, required: true },
  estado: { type: Boolean, required: true },
}, {timestamps: true});
