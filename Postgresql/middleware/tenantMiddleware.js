/**
 * ===================================================
 * Middleware to handle the tenant context with JWT
 * ===================================================
 */

const jwt = require('jsonwebtoken'); // To decode and validate JSON Web Tokens
const pool = require('../api/db_connections'); // Database connection configuration
require('dotenv').config(); // To load environment variables

/**
 * Middleware to validate JWT, extract tenant ID, and set active tenant
 */
const tenantMiddleware = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1];

        // If the token is missing, return a 401 error
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is required' });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { tenantId } = decoded;

        // If the token does not include a tenant ID, return a 403 error
        if (!tenantId) {
            return res.status(403).json({ error: 'Token does not contain a valid tenant ID' });
        }

        // Validate that the tenant ID is a number
        if (isNaN(tenantId)) {
            return res.status(400).json({ error: 'Tenant ID must be a valid number' });
        }

        // Set the active tenant in PostgreSQL
        console.log(`Setting tenant context for tenant ID: ${tenantId}`);
        const query = `SET app.tenant_id = ${tenantId}`;
        await pool.query(query);

        // Proceed to the next middleware or route
        next();
    } catch (err) {
        console.error('Error validating token or setting tenant context:', err);

        // Return an appropriate error based on the type of issue
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

// Export the middleware so it can be used in other files
module.exports = tenantMiddleware;
