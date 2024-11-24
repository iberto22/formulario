SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

DROP DATABASE IF EXISTS Pet_Hotel;
CREATE DATABASE Pet_Hotel DEFAULT charset utf8mb4;
USE Pet_Hotel;

CREATE TABLE IF NOT EXISTS clientes (
id_cliente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre_cliente VARCHAR(25) NOT NULL,
apellido_cliente VARCHAR(50) NOT NULL,
email_cliente VARCHAR(100) NOT NULL,
telefono VARCHAR(15),
calle VARCHAR(15), 
id_direccion int,
id_mascota INT
);

CREATE TABLE IF NOT EXISTS mascotas (
id_mascota INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
tipo_mascota ENUM("perro","gato"),
nombre_mascota VARCHAR(25) NOT NULL,
raza VARCHAR(50) NOT NULL,
edad INT NOT NULL,
sexo ENUM ("macho", "hembra"),
vacunacion VARCHAR(50) NOT NULL,
chip ENUM ("si", "no"),
tipo_alimento VARCHAR(15), 
id_cliente int NOT NULL,
id_hospedaje int NOT NULL
);

CREATE TABLE IF NOT EXISTS hospedaje (
id_hospedaje INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
tipo_habitacion enum ("individual", "suite", "individual_gato","suite_gato"),
fecha_entrada DATE NOT NULL,
fecha_salida DATE,
precio_dia DECIMAL(2,2) NOT NULL,
precio_mes INT,
id_mascota INT NOT NULL
);

CREATE TABLE IF NOT EXISTS direccion (
id_direccion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre_calle VARCHAR(25) NOT NULL,
numero_calle INT NOT NULL,
CP INT NOT NULL,
poblacion_residencia VARCHAR(15)
);


ALTER TABLE `Pet_Hotel`.`clientes` 
ADD CONSTRAINT `FK_CLIENTES_MASCOTAS`
  FOREIGN KEY (`id_mascota`)
  REFERENCES `Pet_Hotel`.`mascotas` (`id_mascota`)
  ON DELETE RESTRICT
  ON UPDATE CASCADE;
  
  ALTER TABLE `Pet_Hotel`.`mascotas` 
ADD CONSTRAINT `FK_CLIENTES_HOSPEDAJE`
  FOREIGN KEY (`id_hospedaje`)
  REFERENCES `Pet_Hotel`.`hospedaje` (`id_hospedaje`)
  ON DELETE RESTRICT
  ON UPDATE CASCADE;
  
  ALTER TABLE `Pet_Hotel`.`clientes` 
ADD CONSTRAINT `FK_CLIENTES_DIRECCION`
  FOREIGN KEY (`id_direccion`)
  REFERENCES `Pet_Hotel`.`direccion` (`id_direccion`)
  ON DELETE RESTRICT
  ON UPDATE CASCADE;
  USE pet_hotel;
  CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,  -- Identificador único de la reserva
    id_cliente INT NOT NULL,                   -- Relación con el cliente que realiza la reserva
    id_mascota INT NOT NULL,                   -- Relación con la mascota asociada
    id_hospedaje INT NOT NULL,                 -- Relación con el tipo de habitación
    fecha_inicio DATE NOT NULL,                -- Fecha de inicio de la reserva
    fecha_fin DATE NOT NULL,                   -- Fecha de fin de la reserva
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_mascota) REFERENCES mascotas(id_mascota),
    FOREIGN KEY (id_hospedaje) REFERENCES hospedaje(id_hospedaje)
);

ALTER TABLE hospedaje DROP COLUMN id_mascota;
ALTER TABLE hospedaje MODIFY COLUMN tipo_habitacion ENUM('perro','gato');
ALTER TABLE hospedaje MODIFY COLUMN fecha_entrada DATE NULL;
ALTER TABLE hospedaje MODIFY COLUMN fecha_salida DATE NULL;
ALTER TABLE hospedaje MODIFY COLUMN precio_dia INT;
INSERT INTO hospedaje (tipo_habitacion, fecha_entrada, fecha_salida, precio_dia, precio_mes)
VALUES 
    ('perro', NULL, NULL, 54.19, 1500), 
    ('gato', NULL, NULL, 40.24, 1200);
    
SELECT * from hospedaje.precio_dia