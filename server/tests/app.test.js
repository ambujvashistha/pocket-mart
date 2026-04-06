const {
  getProducts,
  getCart,
  addToCart,
  updateCartItem,
  clearCart,
  createOrder,
  getOrders
} = require('../src/data/store');

describe('PocketMart store', () => {
  beforeEach(() => {
    clearCart();
  });

  it('returns seeded products', () => {
    const products = getProducts();

    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('id');
  });

  it('adds items to the cart', () => {
    const result = addToCart('prod-1', 2);

    expect(result.status).toBe(200);
    expect(getCart().items[0]).toHaveProperty('productId', 'prod-1');
    expect(getCart().total).toBeGreaterThan(0);
  });

  it('updates item quantity in the cart', () => {
    addToCart('prod-1', 1);
    const result = updateCartItem('prod-1', 3);

    expect(result.status).toBe(200);
    expect(getCart().items[0]).toHaveProperty('quantity', 3);
  });

  it('creates an order from cart items', () => {
    addToCart('prod-2', 1);
    const result = createOrder('Ambuj');

    expect(result.status).toBe(201);
    expect(result.data).toHaveProperty('customerName', 'Ambuj');
    expect(result.data.items.length).toBeGreaterThan(0);
    expect(getOrders().length).toBeGreaterThan(0);
    expect(getCart().items.length).toBe(0);
  });
});
