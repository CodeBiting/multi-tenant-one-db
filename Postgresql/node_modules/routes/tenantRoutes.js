// ================================================
// Rutas para la tabla "tenants"
// ================================================

// Importamos dependencias necesarias
const express = require('express'); // Framework para manejar rutas y solicitudes HTTP
const pool = require('../db'); // Configuración de conexión a la base de datos
const router = express.Router(); // Creación de un enrutador para manejar rutas específicas

// ================================================
// Obtener todos los tenants
// ================================================
router.get('/', async (req, res) => {
  try {
    // Consulta para obtener todos los tenants de la base de datos
    const result = await pool.query('SELECT * FROM tenants');
    res.json(result.rows); // Devolver los resultados en formato JSON
  } catch (err) {
    console.error('Error fetching tenants:', err); // Mostrar el error en la consola
    res.status(500).json({ error: 'Internal server error' }); // Respuesta de error en caso de fallo
  }
});

// ================================================
// Obtener un tenant específico por su ID
// ================================================
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Obtener el ID del tenant desde los parámetros de la ruta
  try {
    // Consulta para obtener un tenant por su ID
    const result = await pool.query('SELECT * FROM tenants WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      // Si no se encuentra el tenant, devolver un error 404
      return res.status(404).json({ error: 'Tenant not found' });
    }
    res.json(result.rows[0]); // Devolver el tenant encontrado
  } catch (err) {
    console.error('Error fetching tenant:', err); // Mostrar el error en la consola
    res.status(500).json({ error: 'Internal server error' }); // Respuesta de error en caso de fallo
  }
});

// ================================================
// Crear un nuevo tenant
// ================================================
router.post('/', async (req, res) => {
  const { name, domain } = req.body; // Datos del nuevo tenant desde el cuerpo de la solicitud
  try {
    // Insertar el nuevo tenant en la tabla
    const result = await pool.query(
      'INSERT INTO tenants (name, domain) VALUES ($1, $2) RETURNING *',
      [name, domain]
    );
    res.status(201).json(result.rows[0]); // Devolver el tenant recién creado con un código de éxito 201
  } catch (err) {
    console.error('Error creating tenant:', err); // Mostrar el error en la consola
    res.status(500).json({ error: 'Internal server error' }); // Respuesta de error en caso de fallo
  }
});

// Exportar el enrutador para usarlo en otros archivos
module.exports = router;
