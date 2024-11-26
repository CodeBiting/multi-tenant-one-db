/**
 * ===================================================
 * Middleware to handle the tenant context
 * ===================================================
 */

// Import the database connection configuration
const pool = require('../api/db_connections');

/**
 * Middleware to validate and set the active tenant
 */
const tenantMiddleware = async (req, res, next) => {
    // Read the tenant ID from the request headers
    const tenantId = req.headers['x-tenant-id'];

    // If the tenant ID is not provided, return a 400 error
    if (!tenantId) {
        return res.status(400).json({ error: 'Tenant ID is required' });
    }

    try {
    // Set the active tenant in PostgreSQL
    // This configures the tenant context for Row-Level Security (RLS)
        await pool.query('SET app.tenant_id = $1', [tenantId]);

        // Proceed to the next middleware or route
        next();
    } catch (err) {
    // Handle errors in case of failures when setting the tenant context
        console.error('Error setting tenant context:', err);
        res.status(500).json({ error: 'Internal server error' }); // Return an error response to the client
    }
};

// Export the middleware so it can be used in other files
module.exports = tenantMiddleware;
