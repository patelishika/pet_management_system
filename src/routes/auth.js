import { Router } from 'express';
import { signIn, signUp, verifyOtp } from '../controllers/auth.js';

const router = Router();

router.post('/signup', signUp);
router.post('/verifyotp', verifyOtp);
router.post('/signin', signIn);

export default router;
