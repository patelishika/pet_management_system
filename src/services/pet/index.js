import {
  approvePet,
  createPet,
  deletePetById,
  getAllPets,
  getPendingPets,
  getPetById,
} from '../../repositories/pet/index.js';

export const createPetService = async (data, userId, files) => {
  const pet = await createPet(data, userId, files);

  return {
    success: true,
    message: 'Pet send to approval',
    status: 200,
  };
};

export const getPendingPetsService = async () => {
  const pets = await getPendingPets();

  if (!pets) {
    return {
      success: false,
      message: 'Pet not found',
      status: 404,
    };
  }

  return {
    success: true,
    message: 'Pet fetched successfully',
    status: 200,
    data: pet,
  };
};

export const approvePetService = async (id) => {
  const pet = await approvePet(id);

  if (!pet) {
    return {
      success: false,
      message: 'Pet not found',
      status: 404,
    };
  }

  return {
    success: true,
    message: 'Pet updated successfully',
    status: 200,
    data: pet,
  };
};

export const getPetService = async (petId, userId) => {
  const pet = await getPetById(petId);

  if (!pet) {
    return {
      success: false,
      message: 'Pet not found',
      status: 404,
    };
  }

  const isOwner = pet.owner.toString() === userId;

  if (isowner) {
    return {
      success: true,
      message: 'Pet fetched successfully',
      status: 200,
      data: pet,
    };
  }

  if (pet.status !== 'APPROVED' || pet.status == 'SOLD') {
    return {
      success: false,
      message: 'Pet not found',
      status: 404,
    };
  }
  return {
    success: true,
    message: 'Pet fetched successfully',
    status: 200,
    data: pet,
  };
};

export const getAllPetsService = async (userId) => {
  const pets = await getAllPets();

  const visiblePets = pets.filter((pet) => {
    if (pet.owner.toString() === userId) {
      return true;
    }

    if (pet.status === 'APPROVED' && pet.status !== 'SOLD') {
      return true;
    }
  });

  return {
    success: true,
    message: 'Pets fetched successfully',
    status: 200,
    data: visiblePets,
  };
};

export const deletePetService = async (petId, userId) => {
  const pet = await deletePetById(petId, userId);

  if (!pet) {
    return {
      success: false,
      message: 'Pet not found or access denied',
      status: 404,
    };
  }

  return {
    success: true,
    message: 'Pet deleted successfully',
    status: 200,
  };
};
