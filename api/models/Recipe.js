import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  ingredients: [{
    type: String,
    required: true
  }],
  instructions: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('Recipe', recipeSchema);
