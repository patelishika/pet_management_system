import { Pet } from '../../models/pet.js';

export const createPet = async (data, userId, files) => {
  const pet = await Pet.create({
    data,
    owner: userId,
    images: files,
  });

  return pet;
};

export const getPendingPets = async () => {
  const pets = await Pet.find({
    status: 'UNAPPROVED',
  });
  return pets;
};

export const approvePet = async (id) => {
  const pet = await Pet.findByIdAndUpdate(
    id,
    {
      status: 'APPROVED',
    },
    {
      new: true,
    }
  );
  return pet;
};

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
