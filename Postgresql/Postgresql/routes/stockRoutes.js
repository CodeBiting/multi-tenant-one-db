/**
 * ===================================================
 * Routes for the "stocks" table (Products)
 * ===================================================
 */

// Import necessary dependencies
const express = require('express'); // Framework for handling routes and HTTP requests
const pool = require('../api/db_connections'); // Database connection configuration
const router = express.Router(); // Create a router to handle specific routes

/**
 * ===================================================
 * Get all products for the active tenant
 * ===================================================
 */
router.get('/', async (req, res) => {
    try {
    // Query to fetch all products (stocks) for the active tenant
    // The active tenant is determined by the value set in 'app.tenant_id'
        const result = await pool.query(
            'SELECT * FROM stocks WHERE tenant_id = current_setting(\'app.tenant_id\')::INT'
        );
        res.json(result.rows); // Return the products in JSON format
    } catch (err) {
        console.error('Error fetching stocks:', err); // Log the error to the console
        res.status(500).json({ error: 'Internal server error' }); // Return an error response in case of failure
    }
});

/**
 * ===================================================
 * Create a new product
 * ===================================================
 */
router.post('/', async (req, res) => {
    const { product_name, quantity } = req.body; // Extract new product data from the request body
    try {
    // Insert a new product into the "stocks" table
        const result = await pool.query(
            'INSERT INTO stocks (tenant_id, product_name, quantity, updated_at) VALUES (current_setting(\'app.tenant_id\')::INT, $1, $2, CURRENT_TIMESTAMP) RETURNING *',
            [product_name, quantity]
        );
        res.status(201).json(result.rows[0]); // Return the newly created product with a 201 success code
    } catch (err) {
        console.error('Error creating stock:', err); // Log the error to the console
        res.status(500).json({ error: 'Internal server error' }); // Return an error response in case of failure
    }
});

// Export the router to use it in other files
module.exports = router;
