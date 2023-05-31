const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excelController');
const multer = require('multer');

// Configuración de multer para el almacenamiento del archivo
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Rutas para el controlador de Excel
router.post('/uploads', upload.single('file'), excelController.uploadExcel);
// router.get('/download', excelController.downloadExcel);

module.exports = router;
