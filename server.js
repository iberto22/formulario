const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de vistas
app.set('view engine', 'pug');
app.set('views', './views');

// Rutas
const rutasReservas = require('./routes/reservas');
const rutasUsuarios = require('./routes/usuarios');

app.use('/reservas', rutasReservas);
app.use('/usuarios', rutasUsuarios);

// Página principal
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Hotel de Mascotas', mensaje: '¡Bienvenido al Hotel de Mascotas!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});