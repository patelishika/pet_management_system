import { Order } from '../../models/order.js';
import { Pet } from '../../models/pet.js';

export const findPetById = async (id) => {
  const pet = await Pet.findById(id);
  return pet;
};

export const createOrder = async (userId, petId, ownerId) => {
  const order = await Order.create({
    pet: petId,
    seller: ownerId,
    buyer: userId,
  });
  return order;
};

export const getOrderById = async (id) => {
  const order = await Order.findById(id);
  return order;
};
