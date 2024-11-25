// ================================================
// Middleware para manejar el contexto del tenant
// ================================================

// Importamos la configuración de conexión a la base de datos
const pool = require('../db');

// Middleware para validar y establecer el tenant activo
const tenantMiddleware = async (req, res, next) => {
  // Leer el tenant ID desde los headers de la solicitud
  const tenantId = req.headers['x-tenant-id'];

  // Si no se proporciona el tenant ID, devolver un error 400
  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant ID is required' });
  }

  try {
    // Establecer el tenant activo en PostgreSQL
    // Esto configura el contexto del tenant para Row-Level Security (RLS)
    await pool.query('SET app.tenant_id = $1', [tenantId]);

    // Pasar al siguiente middleware o ruta
    next();
  } catch (err) {
    // Manejo de errores en caso de fallos al configurar el contexto del tenant
    console.error('Error setting tenant context:', err);
    res.status(500).json({ error: 'Internal server error' }); // Respuesta de error al cliente
  }
};

// Exportar el middleware para que pueda ser utilizado en otros archivos
module.exports = tenantMiddleware;
