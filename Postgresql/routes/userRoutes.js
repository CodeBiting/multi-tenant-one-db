// ================================================
// Rutas para la tabla "users"
// ================================================

// Importamos dependencias necesarias
const express = require('express'); // Framework para manejar rutas y solicitudes HTTP
const pool = require('../db'); // Configuración de conexión a la base de datos
const router = express.Router(); // Creación de un enrutador para manejar rutas específicas

// ================================================
// Obtener todos los usuarios del tenant activo
// ================================================
router.get('/', async (req, res) => {
  try {
    // Consulta para obtener todos los usuarios vinculados al tenant activo
    const result = await pool.query('SELECT * FROM users WHERE tenant_id = current_setting(\'app.tenant_id\')::INT');
    res.json(result.rows); // Devolver los resultados en formato JSON
  } catch (err) {
    console.error('Error fetching users:', err); // Mostrar el error en la consola
    res.status(500).json({ error: 'Internal server error' }); // Respuesta de error en caso de fallo
  }
});

// ================================================
// Obtener un usuario específico por su ID
// ================================================
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Obtener el ID del usuario desde los parámetros de la ruta
  try {
    // Consulta para obtener un usuario por su ID y tenant activo
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1 AND tenant_id = current_setting(\'app.tenant_id\')::INT',
      [id]
    );
    if (result.rows.length === 0) {
      // Si no se encuentra el usuario, devolver un error 404
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]); // Devolver el usuario encontrado
  } catch (err) {
    console.error('Error fetching user:', err); // Mostrar el error en la consola
    res.status(500).json({ error: 'Internal server error' }); // Respuesta de error en caso de fallo
  }
});

// ================================================
// Crear un nuevo usuario
// ================================================
router.post('/', async (req, res) => {
  const { username, email, password_hash } = req.body; // Datos del nuevo usuario desde el cuerpo de la solicitud
  try {
    // Insertar el nuevo usuario en la tabla
    const result = await pool.query(
      'INSERT INTO users (tenant_id, username, email, password_hash, created_at) VALUES (current_setting(\'app.tenant_id\')::INT, $1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
      [username, email, password_hash]
    );
    res.status(201).json(result.rows[0]); // Devolver el usuario recién creado con un código de éxito 201
  } catch (err) {
    console.error('Error creating user:', err); // Mostrar el error en la consola
    res.status(500).json({ error: 'Internal server error' }); // Respuesta de error en caso de fallo
  }
});

// ================================================
// Actualizar un usuario existente
// ================================================
router.put('/:id', async (req, res) => {
  const { id } = req.params; // ID del usuario a actualizar desde los parámetros de la ruta
  const { username, email, password_hash } = req.body; // Datos actualizados desde el cuerpo de la solicitud
  try {
    // Actualizar el usuario con el ID y tenant activo especificados
    const result = await pool.query(
      'UPDATE users SET username = $1, email = $2, password_hash = $3 WHERE id = $4 AND tenant_id = current_setting(\'app.tenant_id\')::INT RETURNING *',
      [username, email, password_hash, id]
    );
    if (result.rows.length === 0) {
      // Si no se encuentra el usuario, devolver un error 404
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]); // Devolver el usuario actualizado
  } catch (err) {
    console.error('Error updating user:', err); // Mostrar el error en la consola
    res.status(500).json({ error: 'Internal server error' }); // Respuesta de error en caso de fallo
  }
});

// ================================================
// Eliminar un usuario
// ================================================
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // ID del usuario a eliminar desde los parámetros de la ruta
  try {
    // Eliminar el usuario con el ID y tenant activo especificados
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 AND tenant_id = current_setting(\'app.tenant_id\')::INT RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      // Si no se encuentra el usuario, devolver un error 404
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]); // Devolver el usuario eliminado
  } catch (err) {
    console.error('Error deleting user:', err); // Mostrar el error en la consola
    res.status(500).json({ error: 'Internal server error' }); // Respuesta de error en caso de fallo
  }
});

// Exportar el enrutador para usarlo en otros archivos
module.exports = router;
