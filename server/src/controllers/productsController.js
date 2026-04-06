const { getProducts } = require('../data/store');

function listProducts(req, res) {
  res.json({
    products: getProducts()
  });
}

module.exports = {
  listProducts
};
