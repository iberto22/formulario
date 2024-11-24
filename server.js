const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const reservasRoutes = require('./routes/reservas');
const clientesRoutes = require('./routes/clientes');
const mascotasRoutes = require('./routes/mascotas');

const app = express();

// Configuración de vistas con Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos (CSS, imágenes, etc.)

// Rutas de las APIs
app.use('/reservas', reservasRoutes);
app.use('/clientes', clientesRoutes);
app.use('/mascotas', mascotasRoutes);

// Rutas para el frontend
app.get('/', (req, res) => res.render('index'));
app.get('/verificar-disponibilidad', (req, res) => res.render('verificar-disponibilidad'));
app.get('/registrar-usuario', (req, res) => res.render('registrar-usuario'));
app.get('/registrar-mascota', (req, res) => res.render('registrar-mascota'));
app.get('/crear-reserva', (req, res) => res.render('crear-reserva'));

//Pruebas
console.log('Datos recibidos:', { tipo_mascota, fecha_inicio, fecha_fin });
// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));




