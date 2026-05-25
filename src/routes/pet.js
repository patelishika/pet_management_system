import { Router } from 'express';
import {
  approvePet,
  createPet,
  deletePet,
  getAllPets,
  getPendingPets,
  getPet,
  updatePet,
} from '../controllers/pet.js';
import { protect } from '../middlewares/auth.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.post('/', protect(), upload.array('images', 10), createPet);
router.get('/admin/pending-pets', protect('ADMIN'), getPendingPets);
router.patch('/admin/approve-pet/:id', protect('ADMIN'), approvePet);
router.get('/:id', protect(), getPet);
router.get('/', protect(), getAllPets);
router.put('/:id', protect(), updatePet);
router.delete('/:id', protect(), deletePet);

export default router;
