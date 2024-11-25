// ============================================
// server.js - Archivo principal del servidor
// ============================================

// Importamos módulos y rutas necesarios
const express = require('express'); // Framework web para manejar solicitudes HTTP y crear APIs REST
const tenantRoutes = require('./routes/tenantRoutes'); // Rutas para la tabla 'tenants' (clientes)
const stockRoutes = require('./routes/stockRoutes'); // Rutas para la tabla 'stocks' (inventario)
const tenantMiddleware = require('./middleware/tenantMiddleware'); // Middleware para manejar y validar el tenant activo
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

// Creamos una instancia de la aplicación Express
const app = express();

// Middlewares
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes HTTP en formato JSON
app.use(tenantMiddleware); // Middleware personalizado para manejar el contexto del tenant activo

// Rutas
app.use('/tenants', tenantRoutes); // Endpoints relacionados con la gestión de clientes (tenants)
app.use('/stocks', stockRoutes); // Endpoints relacionados con la gestión del inventario (stocks)

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 3000; // Define el puerto desde las variables de entorno o usa 3000 por defecto
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Mensaje en consola indicando que el servidor está activo
});
