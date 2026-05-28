import { ar } from 'zod/locales';
import { paramSchema } from '../schemas/params.js';
import { petSchema } from '../schemas/pet.js';
import {
  approvePetService,
  createPetService,
  deletePetService,
  getAllPetsService,
  getPendingPetsService,
  getPetService,
  updatePetService,
} from '../services/pet/index.js';

export const createPet = async (req, res) => {
  try {
    const { data, success, error } = petSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ message: 'Invalid request', error: error });
    }

    const result = await createPetService({
      ...data,
      owner: req.user.id,
      images: req.files,
    });
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};

export const getPendingPets = async (req, res) => {
  try {
    const result = await getPendingPetsService();

    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const approvePet = async (req, res) => {
  try {
    const { data, success, error } = paramSchema.safeParse(req.params);

    if (!success) {
      return res.status(400).json({ message: 'Invalid request', error: error });
    }

    const result = await approvePetService(data.id);

    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const getPet = async (req, res) => {
  try {
    const { data, success, error } = paramSchema.safeParse(req.params);

    if (!success) {
      return res.status(400).json({ message: 'Invalid request', error: error });
    }

    const result = await getPetService({ petId: data.id, userId: req.user.id });
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};

export const getAllPets = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await getAllPetsService(userId);

    return res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};

export const updatePet = async (req, res) => {
  try {
    const { data, success, error } = petSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ message: 'Invalid request', error: error });
    }

    const result = await updatePetService({
      petId: req.params.id,
      userId: req.user.id,
      data,
    });

    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};

export const deletePet = async (req, res) => {
  try {
    const { data, success, error } = paramSchema.safeParse(req.params);

    if (!success) {
      return res.status(400).json({ message: 'Invalid request', error: error });
    }

    const result = await deletePetService({ petId: data.id, userId: req.user.id });
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};
