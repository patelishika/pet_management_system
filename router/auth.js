import { Router } from 'express';
import { signUp } from '../controller/auth';

const router = Router();

router.post('/', signUp);

export default router;
