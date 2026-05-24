import { Pet } from '../../models/pet.js';

export const getPetById = async (id) => {
  const pet = await Pet.findById(id);
  return pet;
};

export const deletePetById = async (petId, userId) => {
  const pet = await Pet.findByIdAndDelete({ id: petId, owner: userId });
  return pet;
};
