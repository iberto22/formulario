const express = require('express');
const connection = require('../db/connection');
const router = express.Router();

// Registrar mascota
router.post('/registrar', (req, res) => {
    const { id_cliente, nombre_mascota, tipo_mascota } = req.body;

    const query = 'INSERT INTO mascotas (id_cliente, nombre, tipo) VALUES (?, ?, ?)';

    connection.query(query, [id_cliente, nombre_mascota, tipo_mascota], (err) => {
        if (err) {
            res.status(500).send('Error al registrar mascota.');
            return;
        }
        res.send('Mascota registrada exitosamente.');
    });
});

module.exports = router;
