// ================================================
// Rutas para la tabla "stocks" (Productos)
// ================================================

// Importamos dependencias necesarias
const express = require('express'); // Framework para manejar rutas y solicitudes HTTP
const pool = require('../db'); // Configuración de conexión a la base de datos
const router = express.Router(); // Creación de un enrutador para manejar rutas específicas

// ================================================
// Obtener todos los productos del tenant activo
// ================================================
router.get('/', async (req, res) => {
  try {
    // Consulta para obtener todos los productos (stocks) del tenant activo
    // El tenant activo está determinado por el valor configurado en 'app.tenant_id'
    const result = await pool.query(
      'SELECT * FROM stocks WHERE tenant_id = current_setting(\'app.tenant_id\')::INT'
    );
    res.json(result.rows); // Devolver los productos en formato JSON
  } catch (err) {
    console.error('Error fetching stocks:', err); // Mostrar el error en la consola
    res.status(500).json({ error: 'Internal server error' }); // Respuesta de error en caso de fallo
  }
});

// ================================================
// Crear un nuevo producto
// ================================================
router.post('/', async (req, res) => {
  const { product_name, quantity } = req.body; // Datos del nuevo producto desde el cuerpo de la solicitud
  try {
    // Insertar un nuevo producto en la tabla "stocks"
    const result = await pool.query(
      'INSERT INTO stocks (tenant_id, product_name, quantity, updated_at) VALUES (current_setting(\'app.tenant_id\')::INT, $1, $2, CURRENT_TIMESTAMP) RETURNING *',
      [product_name, quantity]
    );
    res.status(201).json(result.rows[0]); // Devolver el producto recién creado con un código de éxito 201
  } catch (err) {
    console.error('Error creating stock:', err); // Mostrar el error en la consola
    res.status(500).json({ error: 'Internal server error' }); // Respuesta de error en caso de fallo
  }
});

// Exportar el enrutador para usarlo en otros archivos
module.exports = router;
