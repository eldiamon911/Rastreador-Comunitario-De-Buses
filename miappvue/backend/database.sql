CREATE DATABASE IF NOT EXISTS pronto_db;
USE pronto_db;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rutas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(10) NOT NULL,
    nombre VARCHAR(150) NOT NULL
);

CREATE TABLE paradas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    latitud DECIMAL(10, 7) NOT NULL,
    longitud DECIMAL(10, 7) NOT NULL,
    id_ruta INT,
    FOREIGN KEY (id_ruta) REFERENCES rutas(id)
);

CREATE TABLE buses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conductor VARCHAR(100) NOT NULL,
    placa VARCHAR(20) NOT NULL,
    capacidad INT NOT NULL,
    estado VARCHAR(30) DEFAULT 'En movimiento',
    latitud DECIMAL(10, 7),
    longitud DECIMAL(10, 7),
    id_ruta INT,
    FOREIGN KEY (id_ruta) REFERENCES rutas(id)
);

CREATE TABLE ruta_puntos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_ruta INT NOT NULL,
    latitud DECIMAL(10, 7) NOT NULL,
    longitud DECIMAL(10, 7) NOT NULL,
    orden INT NOT NULL,
    FOREIGN KEY (id_ruta) REFERENCES ruta_puntos(id)
);