const express = require('express');
const { listOrders, placeOrder } = require('../controllers/ordersController');

const router = express.Router();

router.get('/', listOrders);
router.post('/', placeOrder);

module.exports = router;
