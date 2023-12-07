import React, { useState } from 'react';

function AddRecipeForm() {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredients: '',
    instructions: ''
  });

  const handleChange = e => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: recipe.name,
          description: recipe.description,
          ingredients: recipe.ingredients.split('\n'),
          instructions: recipe.instructions.split('\n'),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        alert('Рецепт добавлен успешно!');
        setRecipe({ name: '', description: '', ingredients: '', instructions: '' });
      }
    } catch (error) {
      console.error('Ошибка при добавлении рецепта:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить Рецепт</h2>
      <div>
        <label>Название:</label>
        <input 
          type="text" 
          name="name" 
          value={recipe.name} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div>
        <label>Описание:</label>
        <textarea 
          name="description" 
          value={recipe.description} 
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Ингредиенты (каждый с новой строки):</label>
        <textarea 
          name="ingredients" 
          value={recipe.ingredients} 
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Инструкции (каждый шаг с новой строки):</label>
        <textarea 
          name="instructions" 
          value={recipe.instructions} 
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Добавить Рецепт</button>
    </form>
  );
}

export default AddRecipeForm;
