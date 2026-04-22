import { Database } from '../data/Database';
import { CartService } from './CartService';
import { Order } from '../models/Order';

export class OrderService {
  private db = Database.getInstance();
  private cartService = new CartService();

  public createOrder(customerName: string) {
    const currentCart = this.cartService.getCart();

    if (!customerName || !customerName.trim()) {
      return { error: 'Customer name is required', status: 400 };
    }

    if (currentCart.items.length === 0) {
      return { error: 'Cart is empty', status: 400 };
    }

    for (const item of currentCart.items) {
      if (item.product && item.quantity > item.product.stock) {
        return {
          error: `Insufficient stock for ${item.product.name}`,
          status: 400
        };
      }
    }

    // Deduct stock
    currentCart.items.forEach((item) => {
      if (item.product) {
        item.product.stock -= item.quantity;
      }
    });

    const order = new Order(
      `ord-${this.db.orders.length + 1}`,
      customerName.trim(),
      'Placed',
      currentCart.items,
      currentCart.total,
      new Date().toISOString()
    );

    this.db.orders.unshift(order);
    this.cartService.clearCart();

    return { data: order, status: 201 };
  }

  public getOrders(): Order[] {
    return this.db.orders;
  }
}
