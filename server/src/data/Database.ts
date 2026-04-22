import { Product } from '../models/Product';
import { CartItem } from '../models/CartItem';
import { Order } from '../models/Order';

export class Database {
  private static instance: Database;

  public products: Product[] = [
    new Product('prod-1', 'Wireless Mouse', 'Accessories', 799, 18, 'Compact wireless mouse for daily work and study use.'),
    new Product('prod-2', 'Mechanical Keyboard', 'Accessories', 2499, 10, 'Tactile keyboard with a durable build and clean layout.'),
    new Product('prod-3', 'Gaming Headset', 'Audio', 1899, 14, 'Over-ear headset with clear voice pickup and soft padding.'),
    new Product('prod-4', 'Laptop Stand', 'Workspace', 1199, 9, 'Adjustable stand for comfortable desk setup.')
  ];
  
  public cartItems: CartItem[] = [];
  public orders: Order[] = [];

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
