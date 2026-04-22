import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';

const router = Router();
const controller = new OrderController();

router.get('/', controller.listOrders);
router.post('/', controller.placeOrder);

export default router;
