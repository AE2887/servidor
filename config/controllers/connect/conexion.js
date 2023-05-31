require('dotenv').config();
const mongoose = require('mongoose')

const uri = process.env.DB_URI;



const connectDB = async () => {
    try {
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
      console.log('Conectado a la base de datos...');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  };
  module.exports = connectDB;