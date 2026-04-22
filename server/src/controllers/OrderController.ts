import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';

export class OrderController {
  private orderService = new OrderService();

  public listOrders = (req: Request, res: Response) => {
    res.json({
      orders: this.orderService.getOrders()
    });
  };

  public placeOrder = (req: Request, res: Response): any => {
    const { customerName } = req.body;
    const result = this.orderService.createOrder(customerName);

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    return res.status(result.status).json(result.data);
  };
}
