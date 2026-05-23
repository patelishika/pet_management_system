import { Router } from 'express';
import { signUp } from '../controller/auth.js';

const router = Router();

router.post('/signup', signUp);

export default router;
