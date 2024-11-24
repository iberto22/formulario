const express = require('express');
const connection = require('../db/connection');
const router = express.Router();

// Verificar disponibilidad de habitaciones
router.post('/disponibilidad', (req, res) => {
    const { tipo_mascota, fecha_inicio, fecha_fin } = req.body;

    const query = `
        SELECT * FROM reservas 
        WHERE tipo_mascota = ? 
        AND (fecha_inicio <= ? AND fecha_fin >= ?)
    `;

    connection.query(query, [tipo_mascota, fecha_fin, fecha_inicio], (err, results) => {
        if (err) {
            res.status(500).send('Error al verificar disponibilidad.');
            return;
        }
        if (results.length > 0) {
            res.send('No hay habitaciones disponibles.');
        } else {
            res.send('Habitaciones disponibles.');
        }
    });
});

// Crear reserva
router.post('/crear', (req, res) => {
    const { id_mascota, id_hospedaje, fecha_inicio, fecha_fin } = req.body;

    const query = `
        INSERT INTO reservas (id_mascota, id_hospedaje, fecha_inicio, fecha_fin) 
        VALUES (?, ?, ?, ?)
    `;

    connection.query(query, [id_mascota, id_hospedaje, fecha_inicio, fecha_fin], (err) => {
        if (err) {
            res.status(500).send('Error al crear la reserva.');
            return;
        }
        res.send('Reserva creada exitosamente.');
    });
});

module.exports = router;
