const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

// Rutas para clientes
router.get('/clients', clientsController.getClients);
router.get('/clients/:id', clientsController.getClientById);
router.post('/clients', clientsController.createClient);
router.put('/clients/:id', clientsController.updateClientById);
router.delete('/clients/:id', clientsController.deleteClientById);

module.exports = router;
