import express from 'express';
import { connectDB } from './db/index.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import petRouter from './routes/pet.js';
import orderRouter from './routes/order.js';

const app = express();
app.use(express.json());
const port = 3000;

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/pets', petRouter);
app.use('/api/orders', orderRouter);

app.listen(port, () => {
  console.log('Server is listening on port 3000');
  connectDB();
});
