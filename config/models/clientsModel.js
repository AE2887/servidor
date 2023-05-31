const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  nombre: {
    type: String,
    
  },
  apellido: {
    type: String,
   
  },
  afiliado: {
    type: Number,
  
  },
  dni: {
    type: Number,
 
  },
  direccion: {
    type: String,
   
  },
  telefono: {
    type: String,
    
  },
  fecha: {
    type: Date,
    // Opciones de configuración de fecha
    get: (date) => date ? new Date(date) : null,
    set: (date) => date ? new Date(date).toISOString() : null
  },

});

// ClientSchema.pre('save', function (next) {
//   // Sumar 30 días a la fecha de actualización
//   const nextMonth = new Date(this.actualizacion);
//   nextMonth.setMonth(nextMonth.getMonth() + 1);
//   this.actualizacion = nextMonth;

//   next();
// });

module.exports = mongoose.model('Client', ClientSchema);