import { Router } from 'express';
import { getAllUsers, updateUser } from '../controller/user.js';

const router = Router();

router.get('/', getAllUsers);
router.put('/', updateUser);

export default router;
