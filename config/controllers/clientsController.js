// controllers/clientsController.js
const Client = require('../models/clientsModel');

exports.createClient = async (req, res) => {
  try {
    const { nombre, apellido, afiliado, dni, direccion, telefono, fecha } = req.body;
    const client = new Client({ nombre, apellido, afiliado, dni, direccion, telefono, fecha });
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateClientById = async (req, res) => {
  try {
    const { nombre, apellido, afiliado, dni, direccion, telefono, fecha } = req.body;
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { nombre, apellido, afiliado, dni, direccion, telefono, fecha},
      { new: true, runValidators: true }
    );
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteClientById = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
