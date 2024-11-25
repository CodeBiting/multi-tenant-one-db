// =============================================
// db.js - Configuración de la conexión a PostgreSQL
// =============================================

// Importamos el módulo 'pg' para interactuar con PostgreSQL
const { Pool } = require('pg');

// Cargamos las variables de entorno desde el archivo .env
require('dotenv').config();

// Creamos un pool de conexiones a PostgreSQL
// Esto permite gestionar múltiples conexiones simultáneamente
const pool = new Pool({
  user: process.env.DB_USER, // Usuario de la base de datos definido en .env
  host: process.env.DB_HOST, // Dirección del servidor de la base de datos
  database: process.env.DB_NAME, // Nombre de la base de datos a la que se conecta
  password: process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos
  port: process.env.DB_PORT, // Puerto en el que PostgreSQL está escuchando
});

// Exportamos el pool para que otros archivos puedan usarlo
// Permite realizar consultas a la base de datos desde cualquier parte del proyecto
module.exports = pool;
