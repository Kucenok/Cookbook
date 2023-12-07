import express from 'express';
import ShoppingList from '../models/ShoppingList.js';

const router = express.Router();

// Получение списка покупок
router.get('/', async (req, res) => {
  try {
    const shoppingLists = await ShoppingList.find();
    res.json(shoppingLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создание нового списка покупок
router.post('/', async (req, res) => {
  const shoppingList = new ShoppingList({
    items: req.body.items
  });

  try {
    const newShoppingList = await shoppingList.save();
    res.status(201).json(newShoppingList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Обновление списка покупок
router.put('/:id', async (req, res) => {
  try {
    const updatedShoppingList = await ShoppingList.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedShoppingList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Удаление списка покупок
router.delete('/:id', async (req, res) => {
  try {
    await ShoppingList.findByIdAndDelete(req.params.id);
    res.json({ message: 'Список покупок удален' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
