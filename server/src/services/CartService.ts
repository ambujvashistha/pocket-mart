import { Database } from '../data/Database';
import { ProductService } from './ProductService';
import { CartItem } from '../models/CartItem';

interface CartResult {
  data?: any;
  error?: string;
  status: number;
}

export class CartService {
  private db = Database.getInstance();
  private productService = new ProductService();

  public getCart() {
    const items = this.db.cartItems.map((item) => {
      const product = this.productService.getProductById(item.productId);
      return {
        ...item,
        product
      };
    }).filter((item) => item.product);

    const total = items.reduce((sum, item) => {
      return sum + ((item.product?.price || 0) * item.quantity);
    }, 0);

    return { items, total };
  }

  public addToCart(productId: string, quantity: number = 1): CartResult {
    const product = this.productService.getProductById(productId);

    if (!product) {
      return { error: 'Product not found', status: 404 };
    }

    if (quantity < 1) {
      return { error: 'Quantity must be at least 1', status: 400 };
    }

    const existingItem = this.db.cartItems.find((item) => item.productId === productId);
    const nextQuantity = (existingItem ? existingItem.quantity : 0) + quantity;

    if (nextQuantity > product.stock) {
      return { error: 'Requested quantity exceeds available stock', status: 400 };
    }

    if (existingItem) {
      existingItem.quantity = nextQuantity;
    } else {
      this.db.cartItems.push(new CartItem(productId, quantity));
    }

    return { data: this.getCart(), status: 200 };
  }

  public updateCartItem(productId: string, quantity: number): CartResult {
    const cartItem = this.db.cartItems.find((item) => item.productId === productId);

    if (!cartItem) {
      return { error: 'Cart item not found', status: 404 };
    }

    if (quantity <= 0) {
      this.db.cartItems = this.db.cartItems.filter((item) => item.productId !== productId);
      return { data: this.getCart(), status: 200 };
    }

    const product = this.productService.getProductById(productId);

    if (!product) {
      return { error: 'Product not found', status: 404 };
    }

    if (quantity > product.stock) {
      return { error: 'Requested quantity exceeds available stock', status: 400 };
    }

    cartItem.quantity = quantity;
    return { data: this.getCart(), status: 200 };
  }

  public clearCart() {
    this.db.cartItems = [];
    return this.getCart();
  }
}
