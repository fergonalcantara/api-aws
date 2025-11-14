if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '.env.production' });
} else {
  require('dotenv').config();
}

const express = require('express');
const config = require('./src/config/config');
const { sequelize } = require('./src/config/database');

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Rutas de la API
const routes = require('./src/routes');
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Iniciar servidor
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        app.listen(config.port, '0.0.0.0', () => {
            console.log(`Server running on port ${config.port}`);
            console.log(`Environment: ${process.env.NODE_ENV}`);
        });
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        process.exit(1);
    }
};

startServer();