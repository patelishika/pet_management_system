import { Router } from 'express';
import { cancelOrder, createOrder } from '../controllers/order.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.post('/', protect(), createOrder);
router.delete('/:id', protect(), cancelOrder);

export default router;
