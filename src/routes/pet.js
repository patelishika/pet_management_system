import { Router } from 'express';
import { getPet } from '../controllers/pet.js';

const router = Router();

router.get('/', getPet);

export default router;
