import { Product } from './Product';

export class CartItem {
  constructor(
    public productId: string,
    public quantity: number,
    public product?: Product
  ) {}
}
