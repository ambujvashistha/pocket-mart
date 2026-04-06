const { createOrder, getOrders } = require('../data/store');

function listOrders(req, res) {
  res.json({
    orders: getOrders()
  });
}

function placeOrder(req, res) {
  const { customerName } = req.body;
  const result = createOrder(customerName);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  return res.status(result.status).json(result.data);
}

module.exports = {
  listOrders,
  placeOrder
};
