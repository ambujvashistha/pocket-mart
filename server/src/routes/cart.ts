import { Router } from 'express';
import { CartController } from '../controllers/CartController';

const router = Router();
const controller = new CartController();

router.get('/', controller.readCart);
router.post('/', controller.addCartItem);
router.patch('/:productId', controller.updateCart);
router.delete('/', controller.emptyCart);

export default router;
