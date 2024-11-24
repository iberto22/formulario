const express = require('express');
const connection = require('../db/connection');
const router = express.Router();

// Registrar cliente
router.post('/registrar', (req, res) => {
    const { nombre_cliente, email_cliente } = req.body;

    const query = 'INSERT INTO clientes (nombre, email) VALUES (?, ?)';

    connection.query(query, [nombre_cliente, email_cliente], (err) => {
        if (err) {
            res.status(500).send('Error al registrar cliente.');
            return;
        }
        res.send('Cliente registrado exitosamente.');
    });
});

module.exports = router;
