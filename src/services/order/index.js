import {
  findPetById,
  createOrder,
  getOrderById,
} from '../../repositories/order/index.js';

export const createOrderService = async (data) => {
  const pet = await findPetById(data.petId);

  if (!pet) {
    return {
      success: false,
      message: 'Pet not found',
      status: 404,
    };
  }

  delete data.petId;

  data.pet = pet.id;
  data.seller = pet.owner;

  const order = await createOrder(data);

  return {
    success: true,
    message: 'Order placed successfully',
    status: 200,
    data: order,
  };
};

export const cancelOrderService = async (data) => {
  const order = await getOrderById(data.orderId);

  if (!order) {
    return {
      success: false,
      message: 'Order not found',
      status: 404,
    };
  }

  if (order.buyer.toString() !== data.userId) {
    return {
      success: false,
      message: 'Unauthorized',
      status: 401,
    };
  }

  if (order.status === 'CANCELLED') {
    return {
      success: false,
      message: 'Order already cancelled',
      status: 400,
    };
  }

  const pet = await findPetById(order.pet);

  if (!pet) {
    return {
      success: false,
      message: 'Pet not found',
      status: 404,
    };
  }

  order.status = 'CANCELLED';
  await order.save();

  pet.status = 'APPROVED';
  await pet.save();

  return {
    success: true,
    message: 'Order cancelled successfully',
    status: 200,
    data: order,
  };
};
