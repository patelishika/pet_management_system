import { Router } from 'express';
import { getAllUsers, updateUser } from '../controllers/user.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.get('/', protect('ADMIN'), getAllUsers);
router.put('/', protect(), updateUser);

export default router;
