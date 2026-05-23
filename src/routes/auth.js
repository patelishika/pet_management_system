import { Router } from 'express';
import { signIn, signUp, verifyOpt } from '../controllers/auth.js';

const router = Router();

router.post('/signup', signUp);
router.post('/verifyotp', verifyOpt);
router.post('/signin', signIn);

export default router;
