import { Database } from '../data/Database';
import { Product } from '../models/Product';

export class ProductService {
  private db = Database.getInstance();

  public getProducts(): Product[] {
    return this.db.products;
  }

  public getProductById(productId: string): Product | undefined {
    return this.db.products.find((product) => product.id === productId);
  }
}
