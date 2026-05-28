import {
  approvePet,
  createPet,
  deletePetById,
  getAllPets,
  getPendingPets,
  getPetById,
  updatePetById,
} from '../../repositories/pet/index.js';

export const createPetService = async (data) => {
  if (!data.images || data.images.length === 0) {
    return res.status(400).json({
      message: 'Please upload at least one image',
    });
  }

  const files = data.images.map((file) => {
    return file.filename;
  });

  data.images = files;

  const pet = await createPet(data);

  return {
    success: true,
    message: 'Pet send to approval',
    status: 200,
    data: pet,
  };
};

export const getPendingPetsService = async () => {
  const pets = await getPendingPets();

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

export const getPetService = async (data) => {
  const pet = await getPetById(data.petId);

  if (!pet) {
    return {
      success: false,
      message: 'Pet not found',
      status: 404,
    };
  }

  const isOwner = pet.owner.toString() === data.userId;

  if (isOwner) {
    return {
      success: true,
      message: 'Pet fetched successfully',
      status: 200,
      data: pet,
    };
  }

  if (pet.status !== 'APPROVED') {
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

    if (pet.status === 'APPROVED') {
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

export const updatePetService = async ({ petId, userId, data }) => {
  const pet = await getPetById(petId);

  if (!pet) {
    return {
      success: false,
      message: 'Pet not found',
      status: 404,
    };
  }

  if (pet.ownerId.toString() !== userId.toString()) {
    return {
      success: false,
      message: 'You are not authorized to update this pet',
      status: 403,
    };
  }

  if (pet.status === 'SOLD') {
    return {
      success: false,
      message: 'Sold pet cannot be updated',
      status: 400,
    };
  }

  const updatedPet = await updatePetById(petId, { ...data, status: 'UNAPPROVED' });

  return {
    success: true,
    message: 'Pet updated successfully',
    status: 200,
    data: updatedPet,
  };
};

export const deletePetService = async (data) => {
  const pet = await deletePetById(data);

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
