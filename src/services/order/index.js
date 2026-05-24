import { findPetById, placeOrder } from '../../repositories/order/index.js';

export const createOrderService = async (petId, userId) => {
  const pet = await findPetById(petId);

  if (!pet) {
    return {
      success: false,
      message: 'Pet not found',
      status: 404,
    };
  }

  const order = await placeOrder(userId, pet.id, pet.owner);

  return {
    success: true,
    message: 'Order placed succesfully',
    status: 200,
    data: order,
  };
};
