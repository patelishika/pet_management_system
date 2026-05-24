import { Router } from 'express';
import {
  deleteAllUsers,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/user.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.get('/', protect('ADMIN'), getAllUsers);
router.get('/profile', protect(), getUser);
router.put('/profile', protect(), updateUser);
router.delete('/profile', protect(), deleteUser);
router.delete('/', protect('ADMIN'), deleteAllUsers);

export default router;
