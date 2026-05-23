import { Router } from 'express';
import { signIn, signUp } from '../controller/auth.js';
import { verifyOpt } from '../controller/otp.js';

const router = Router();

router.post('/signup', signUp);
router.post('/verifyotp', verifyOpt);
router.post('/signin', signIn);

export default router;
