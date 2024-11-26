/**
 * ===================================================
 * Routes for the "tenants" table
 * ===================================================
 */

// Import necessary dependencies
const express = require('express'); // Framework for handling routes and HTTP requests
const pool = require('../api/db_connections'); // Database connection configuration
const router = express.Router(); // Create a router to handle specific routes

/**
 * ===================================================
 * Get all tenants
 * ===================================================
 */
router.get('/', async (req, res) => {
    try {
    // Query to fetch all tenants from the database
        const result = await pool.query('SELECT * FROM tenants');
        res.json(result.rows); // Return the results in JSON format
    } catch (err) {
        console.error('Error fetching tenants:', err); // Log the error to the console
        res.status(500).json({ error: 'Internal server error' }); // Return an error response in case of failure
    }
});

/**
 * ===================================================
 * Get a specific tenant by its ID
 * ===================================================
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params; // Extract the tenant ID from the route parameters
    try {
    // Query to fetch a tenant by its ID
        const result = await pool.query('SELECT * FROM tenants WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            // If the tenant is not found, return a 404 error
            return res.status(404).json({ error: 'Tenant not found' });
        }
        res.json(result.rows[0]); // Return the found tenant
    } catch (err) {
        console.error('Error fetching tenant:', err); // Log the error to the console
        res.status(500).json({ error: 'Internal server error' }); // Return an error response in case of failure
    }
});

/**
 * ===================================================
 * Create a new tenant
 * ===================================================
 */
router.post('/', async (req, res) => {
    const { name, domain } = req.body; // Extract new tenant data from the request body
    try {
    // Insert the new tenant into the table
        const result = await pool.query(
            'INSERT INTO tenants (name, domain) VALUES ($1, $2) RETURNING *',
            [name, domain]
        );
        res.status(201).json(result.rows[0]); // Return the newly created tenant with a 201 success code
    } catch (err) {
        console.error('Error creating tenant:', err); // Log the error to the console
        res.status(500).json({ error: 'Internal server error' }); // Return an error response in case of failure
    }
});

// Export the router to use it in other files
module.exports = router;
