/** 
 * ============================================
 * server.js - Main Server File
 * ============================================
 */

// Import required modules and routes
const express = require('express'); // Web framework for handling HTTP requests and creating REST APIs
const tenantRoutes = require('./routes/tenantRoutes'); // Routes for managing the 'tenants' table (clients)
const stockRoutes = require('./routes/stockRoutes'); // Routes for managing the 'stocks' table (inventory)
const tenantMiddleware = require('./middleware/tenantMiddleware'); // Middleware to handle and validate the active tenant
require('dotenv').config(); // Load environment variables from the .env file

// Create an instance of the Express application
const app = express();

/** 
 * =======================
 * Middlewares
 * =======================
 */
app.use(express.json()); // Middleware to parse the body of HTTP requests as JSON
app.use(tenantMiddleware); // Middleware to handle the tenant context

/** 
 * =======================
 * Routes
 * =======================
 */
app.use('/tenants', tenantRoutes); // Routes for tenant management
app.use('/stocks', stockRoutes); // Routes for stock (inventory) management

/** 
 * =======================
 * Server Startup
 * =======================
 */
const PORT = process.env.PORT || 3000; // Get the port from environment variables or default to 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Log server status and port
});
