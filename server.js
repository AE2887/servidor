const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/controllers/connect/conexion.js');

// Configuración del servidor

const port = process.env.PORT || 3000;

// Conexión a la base de datos
connectDB();

// Configuración de CORS y bodyParser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importación de las rutas
const clientsRoutes = require('./config/routes/clientsRoutes');
const excelRoutes = require('./config/routes/excelRoutes');

// Uso de las rutas
app.use('/c', clientsRoutes);
app.use('/excel', excelRoutes);

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
