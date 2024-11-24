const mysql = require('mysql2');

const conexion = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'Pet_Hotel'
});

conexion.getConnection((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

module.exports = conexion.promise();

