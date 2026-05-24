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
router.get('/', protect(), getUser);
router.put('/', protect(), updateUser);
router.delete('/', protect(), deleteUser);
router.delete('/', protect('ADMIN'), deleteAllUsers);

export default router;
