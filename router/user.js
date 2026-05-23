import { Router } from 'express';
import { getAllUsers } from '../controller/user.js';

const router = Router();

router.get('/', getAllUsers);

export default router;
