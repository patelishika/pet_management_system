import { Router } from 'express';
import { deletePet, getPet } from '../controllers/pet.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.get('/', getPet);
router.delete('/:id', protect(), deletePet);

export default router;
