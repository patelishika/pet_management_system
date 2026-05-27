import { Order } from '../../models/order.js';
import { Pet } from '../../models/pet.js';

export const findPetById = async (id) => {
  const pet = await Pet.findById(id);
  return pet;
};

export const createOrder = async (data) => {
  const order = await Order.create(data);
  return order;
};

export const getOrderById = async (id) => {
  const order = await Order.findById(id);
  return order;
};
