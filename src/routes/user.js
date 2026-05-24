import { Router } from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/user.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.get('/', protect('ADMIN'), getAllUsers);
router.put('/', protect(), updateUser);
router.delete('/', protect(), deleteUser);

export default router;
