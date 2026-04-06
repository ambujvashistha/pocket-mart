const express = require('express');
const {
  readCart,
  addCartItem,
  updateCart,
  emptyCart
} = require('../controllers/cartController');

const router = express.Router();

router.get('/', readCart);
router.post('/', addCartItem);
router.patch('/:productId', updateCart);
router.delete('/', emptyCart);

module.exports = router;
