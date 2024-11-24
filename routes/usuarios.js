const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

// Página de registro de clientes
router.get('/registro', (req, res) => {
  res.render('registro_cliente', { titulo: 'Registro de Cliente' });
});

// Página de inicio de sesión
router.get('/login', (req, res) => {
  res.render('login', { titulo: 'Iniciar Sesión' });
});

// Procesar registro de cliente
router.post('/registro', async (req, res) => {
  const { nombre_cliente, apellido_cliente, email_cliente, telefono, nombre_calle, numero_calle, CP, poblacion_residencia, mascotas } = req.body;

  try {
    // Registrar dirección
    const [direccion] = await db.execute(
      `INSERT INTO direccion (nombre_calle, numero_calle, CP, poblacion_residencia)
       VALUES (?, ?, ?, ?)`,
      [nombre_calle, numero_calle, CP, poblacion_residencia]
    );

    // Registrar cliente
    const [cliente] = await db.execute(
      `INSERT INTO clientes (nombre_cliente, apellido_cliente, email_cliente, telefono, id_direccion)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre_cliente, apellido_cliente, email_cliente, telefono, direccion.insertId]
    );

    // Registrar mascota
    const mascota = JSON.parse(mascotas);
    await db.execute(
      `INSERT INTO mascotas (tipo_mascota, nombre_mascota, raza, edad, sexo, vacunacion, chip, tipo_alimento, id_cliente)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [mascota.tipo_mascota, mascota.nombre_mascota, mascota.raza, mascota.edad, mascota.sexo, mascota.vacunacion, mascota.chip, mascota.tipo_alimento, cliente.insertId]
    );

    res.redirect('/');
  } catch (error) {
    res.status(500).render('registro_cliente', { mensaje: 'Error al registrar cliente', error });
  }
});

module.exports = router;
