import { Pet } from '../../models/pet.js';

export const getPetById = async (petId) => {
  const pet = await Pet.findById(petId);
  return pet;
};

export const getAllPets = async () => {
  const pets = await Pet.find();
  return pets;
};

export const deletePetById = async (petId, userId) => {
  const pet = await Pet.findByIdAndDelete({ id: petId, owner: userId });
  return pet;
};
