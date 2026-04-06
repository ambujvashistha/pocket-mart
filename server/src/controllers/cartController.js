const {
  getCart,
  addToCart,
  updateCartItem,
  clearCart
} = require('../data/store');

function readCart(req, res) {
  res.json(getCart());
}

function addCartItem(req, res) {
  const { productId, quantity } = req.body;
  const result = addToCart(productId, Number(quantity) || 1);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  return res.status(result.status).json(result.data);
}

function updateCart(req, res) {
  const { productId } = req.params;
  const { quantity } = req.body;
  const result = updateCartItem(productId, Number(quantity));

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  return res.status(result.status).json(result.data);
}

function emptyCart(req, res) {
  res.json(clearCart());
}

module.exports = {
  readCart,
  addCartItem,
  updateCart,
  emptyCart
};
