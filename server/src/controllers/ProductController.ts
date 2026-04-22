import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  private productService = new ProductService();

  public listProducts = (req: Request, res: Response) => {
    res.json({
      products: this.productService.getProducts()
    });
  };
}
