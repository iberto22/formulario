const express = require('express');
const router = express.Router();
const conexion = require('../db/conexion');

// Renderiza la página de reservas
router.get('/', async (req, res) => {
    try {
        const [habitaciones] = await conexion.query(
            'SELECT * FROM hospedaje WHERE fecha_entrada IS NULL OR fecha_salida < CURDATE()'
        );
        res.render('reservas', { habitaciones });
    } catch (error) {
        console.error('Error al cargar las reservas:', error);
        res.status(500).send('Error al cargar las reservas');
    }
});

// Procesa una reserva
router.post('/', async (req, res) => {
    const { id_cliente, id_habitacion, fecha_inicio, fecha_fin } = req.body;

    try {
        // Comprobar disponibilidad
        const [habitacionesDisponibles] = await conexion.query(
            'SELECT * FROM hospedaje WHERE id_hospedaje = ? AND (fecha_entrada IS NULL OR fecha_salida < ?)',
            [id_habitacion, fecha_inicio]
        );

        if (habitacionesDisponibles.length === 0) {
            return res.status(400).send('La habitación no está disponible para las fechas seleccionadas.');
        }

        // Registrar la reserva
        await conexion.query(
            `INSERT INTO reservas (id_cliente, id_hospedaje, fecha_inicio, fecha_fin)
             VALUES (?, ?, ?, ?)`,
            [id_cliente, id_habitacion, fecha_inicio, fecha_fin]
        );

        // Actualizar la disponibilidad de la habitación
        await conexion.query(
            `UPDATE hospedaje SET fecha_entrada = ?, fecha_salida = ? WHERE id_hospedaje = ?`,
            [fecha_inicio, fecha_fin, id_habitacion]
        );

        res.send('Reserva realizada con éxito.');
    } catch (error) {
        console.error('Error al procesar la reserva:', error);
        res.status(500).send('Error al procesar la reserva');
    }
});

module.exports = router;
