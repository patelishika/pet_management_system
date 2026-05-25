import { paramSchema } from '../schemas/params.js';
import { deletePetService, getPetService } from '../services/pet/index.js';

export const getPet = async (req, res) => {
  try {
    const { data, success, error } = paramSchema.safeParse(req.params);
    const userId = req.user.id;

    if (!success) {
      return res.status(400).json({ message: 'Invalid request', error: error });
    }

    const result = await getPetService(data.id, userId);
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(200).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};

export const deletePet = async (req, res) => {
  try {
    const { data, success, error } = paramSchema.safeParse(req.params);
    const userId = req.user.id;

    if (!success) {
      return res.status(400).json({ message: 'Invalid request', error: error });
    }

    const result = await deletePetService(data.id, userId);
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(200).json({ message: result.message });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};
