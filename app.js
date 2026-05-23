import express from 'express';
import { connectDB } from './db/index.js';
import authRouter from './router/auth.js';

const app = express();
app.use(express.json());
const port = 3000;

app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log('Server is listening on port 3000');
  connectDB();
});
