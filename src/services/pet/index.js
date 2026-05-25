import { deletePetById, getPetById } from '../../repositories/pet/index.js';

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
