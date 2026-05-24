import { Pet } from '../../models/pet.js';

export const getPetById = async (id) => {
  const pet = await Pet.findById(id);
  return pet;
};
