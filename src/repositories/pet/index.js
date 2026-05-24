import { Pet } from '../../models/pet.js';

export const getPetById = async (id) => {
  const pet = await Pet.findById(id);
  return pet;
};

export const deletePetById = async (id) => {
  const pet = await Pet.findByIdAndDelete(id);
  return pet;
};
