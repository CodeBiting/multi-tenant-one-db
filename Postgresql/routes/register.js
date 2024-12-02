const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../api/db_connections');
const router = express.Router();

// Route to handle tenant and user registration
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate the input fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields (name, email, password) are required' });
    }

    try {
        // Generate a hashed password for the new user
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new tenant into the tenants table
        const tenantResult = await pool.query(
            'INSERT INTO tenants (name, domain) VALUES ($1, $2) RETURNING id, name, domain',
            [name, `${name.toLowerCase()}.example.com`] // Automatically set domain to "example.com"
        );
        const tenant = tenantResult.rows[0];

        // Insert a new user for the tenant
        const userResult = await pool.query(
            'INSERT INTO users (tenant_id, username, email, password_hash, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING id, email',
            [tenant.id, email.split('@')[0], email, hashedPassword] // Set username as the part before '@' in email
        );
        const user = userResult.rows[0];

        // Respond with tenant and user details
        return res.json({
            message: 'Tenant and user registered successfully',
            tenant: tenant,
            user: user
        });
    } catch (err) {
        console.error('Error registering tenant:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
