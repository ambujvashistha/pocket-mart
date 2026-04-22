import { Request, Response } from 'express';
import { CartService } from '../services/CartService';

export class CartController {
  private cartService = new CartService();

  public readCart = (req: Request, res: Response) => {
    res.json(this.cartService.getCart());
  };

  public addCartItem = (req: Request, res: Response): any => {
    const { productId, quantity } = req.body;
    const result = this.cartService.addToCart(productId, Number(quantity) || 1);

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    return res.status(result.status).json(result.data);
  };

  public updateCart = (req: Request, res: Response): any => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const result = this.cartService.updateCartItem(productId, Number(quantity));

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    return res.status(result.status).json(result.data);
  };

  public emptyCart = (req: Request, res: Response) => {
    res.json(this.cartService.clearCart());
  };
}
