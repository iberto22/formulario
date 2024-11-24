const mysql = require('mysql2');

// Configuración de la conexión
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Cambia a tu usuario de MySQL
    password: '1234', // Cambia a tu contraseña de MySQL
    database: 'pet_hotel', // Cambia al nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
});

module.exports = connection;
