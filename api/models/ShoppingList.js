import mongoose from 'mongoose';

const shoppingListSchema = new mongoose.Schema({
  items: [{
    name: String,
    quantity: Number,
    purchased: Boolean
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ShoppingList', shoppingListSchema);
