const moment = require('moment');
const XLSX = require('xlsx');

const Clients = require('../models/clientsModel');

exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file || req.file.truncated) { // Verificar si el archivo no se ha subido o se ha truncado
      res.status(400).send({ message: 'No se ha subido ningún archivo o el archivo es demasiado grande' });
    } else {
      const workbook = XLSX.readFile(`uploads/${req.file.filename}`);
      const sheet_name_list = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      const clients = xlData.map(data => {
        const fechaRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Expresión regular para validar el formato de fecha
        const isValidActualizacion = moment(data.actualizacion, 'DD/MM/YYYY', true).isValid();
       
        const isValidFecha = fechaRegex.test(data.fecha);

console.log('¿Fecha válida?: ', isValidFecha);
const fecha = isValidFecha ? moment(data.fecha, 'DD/MM/YYYY').toDate() : null;
        const newClient = {
          nombre: data.nombre,
          apellido: data.apellido,
          afiliado: data.afiliado,
          dni: data.dni,
          direccion: data.direccion,
          telefono: data.telefono,
          fecha: isValidFecha ? moment(data.fecha, 'DD/MM/YYYY').toDate() : null, // Convertir la cadena de fecha en un objeto Date solo si es válida
          actualizacion: isValidActualizacion ? moment(data.actualizacion, 'DD/MM/YYYY') : null // convertir en objeto Date
        };
        return new Clients(newClient);
      });
      await Clients.insertMany(clients);
      res.status(200).send({ message: 'Archivo subido correctamente' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Ha ocurrido un error al subir el archivo' });
  }
};
