import { Router } from 'express';
import { getAllUsers, updateUser } from '../controllers/user.js';

const router = Router();

router.get('/', getAllUsers);
router.put('/', updateUser);

export default router;
