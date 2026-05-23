import { Router } from 'express';
import { signUp } from '../controller/auth.js';
import { verifyOpt } from '../controller/otp.js';

const router = Router();

router.post('/signup', signUp);
router.post('/verifyotp', verifyOpt);

export default router;
