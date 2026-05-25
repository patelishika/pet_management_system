import { Router } from 'express';
import { createOrder } from '../controllers/order.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.post('/', protect(), createOrder);

export default router;
