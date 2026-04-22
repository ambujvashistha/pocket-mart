import { describe, it, expect, beforeEach } from '@jest/globals';
import { ProductService } from '../src/services/ProductService';
import { CartService } from '../src/services/CartService';
import { OrderService } from '../src/services/OrderService';

const productService = new ProductService();
const cartService = new CartService();
const orderService = new OrderService();

describe('PocketMart store', () => {
  beforeEach(() => {
    cartService.clearCart();
  });

  it('returns seeded products', () => {
    const products = productService.getProducts();

    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('id');
  });

  it('adds items to the cart', () => {
    const result = cartService.addToCart('prod-1', 2);

    expect(result.status).toBe(200);
    expect(cartService.getCart().items[0]).toHaveProperty('productId', 'prod-1');
    expect(cartService.getCart().total).toBeGreaterThan(0);
  });

  it('updates item quantity in the cart', () => {
    cartService.addToCart('prod-1', 1);
    const result = cartService.updateCartItem('prod-1', 3);

    expect(result.status).toBe(200);
    expect(cartService.getCart().items[0]).toHaveProperty('quantity', 3);
  });

  it('creates an order from cart items', () => {
    cartService.addToCart('prod-2', 1);
    const result = orderService.createOrder('Ambuj');

    expect(result.status).toBe(201);
    expect(result?.data).toHaveProperty('customerName', 'Ambuj');
    expect(result?.data?.items?.length).toBeGreaterThan(0);
    expect(orderService.getOrders().length).toBeGreaterThan(0);
    expect(cartService.getCart().items.length).toBe(0);
  });
});
