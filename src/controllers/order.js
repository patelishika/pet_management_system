import { orderSchema } from '../schemas/order.js';
import { cancelOrderService, createOrderService } from '../services/order/index.js';
import { paramSchema } from '../schemas/params.js';
export const createOrder = async (req, res) => {
  try {
    const { data, success, error } = orderSchema.safeParse(req.params);
    const userId = req.user.id;

    if (!success) {
      return res.status(400).json({ message: 'Invalid request', error: error });
    }

    const result = await createOrderService(data.id, userId);

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

export const cancelOrder = async (req, res) => {
  try {
    const { data, success, error } = paramSchema.safeParse(req.params);
    const userId = req.user.id;

    if (!success) {
      return res.status(400).json({ message: 'Invalid request', error: error });
    }

    const result = await cancelOrderService(data.id, userId);
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
