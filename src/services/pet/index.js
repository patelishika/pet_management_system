import { deletePetById, getPetById } from '../../repositories/pet/index.js';

export const getPetService = async (id) => {
  const pet = await getPetById(id);

  if (!pet) {
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

export const deletePetService = async (id) => {
  const pet = await deletePetById(id);

  if (!pet) {
    return {
      success: false,
      message: 'Pet not found',
      status: 404,
    };
  }

  return {
    success: true,
    message: 'Pet deleted successfully',
    status: 200,
  };
};
