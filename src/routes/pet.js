import { Router } from 'express';
import { deletePet, getAllPets, getPet } from '../controllers/pet.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.get('/:id', protect(), getPet);
router.get('/', protect(), getAllPets);
router.delete('/:id', protect(), deletePet);

export default router;
