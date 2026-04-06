const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'PocketMart backend is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Root Route (optional, just to show something)
app.get('/', (req, res) => {
  res.send('PocketMart Backend Service');
});

module.exports = app;
