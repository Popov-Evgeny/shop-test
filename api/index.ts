import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import config from './config';
import productsRouter from './routes/products';
import categoriesRouter from './routes/categories';
import usersRouter from './routes/users';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(config.port, () => {
    console.log(`Started port: ${config.port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
