import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const router = Router();
const controller = new ProductController();

router.get('/', controller.listProducts);

export default router;
