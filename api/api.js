import recipesRouter from './routes/recipes.js';
import shoppingListRoutes from './routes/shoppingListRoutes.js';

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://postgres:postgres@cluster.ui2gumn.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


  app.use(cors());
// Промежуточное ПО для парсинга тела запроса в формате JSON
app.use(bodyParser.json());

// Простой тестовый маршрут
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from BookCook API!' });
});

// Здесь вы можете добавить дополнительные маршруты, например:
// app.use('/api/recipes', require('./routes/recipes'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use('/api/recipes', recipesRouter);
app.use('/api/shopping-lists', shoppingListRoutes);
