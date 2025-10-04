const mongoose = require("mongoose");

const JuegoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  genero: {
    type: String,
    required: false
  },          
  plataforma: {
    type: String,
    required: true
  },  
  añoLanzamiento: {
    type: Number,
    required: true,
    min: 1950,
    max: new Date().getFullYear()
  },
  desarrollador: {
    type: String,
    required: false
  },
  imagenPortada: {
    type: String,
    required: false,
    trim: true
  }, 
  descripcion: {
    type: String,
    required: false
  },
  completado: {
    type: Boolean,
    default: false
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Juego", JuegoSchema);