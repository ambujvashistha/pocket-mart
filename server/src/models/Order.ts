import { CartItem } from './CartItem';

export class Order {
  constructor(
    public id: string,
    public customerName: string,
    public status: string,
    public items: CartItem[],
    public total: number,
    public createdAt: string
  ) {}
}
