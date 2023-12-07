import React, { useState, useEffect } from 'react';
import EditRecipeForm from './EditRecipeForm.js';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await fetch('/api/recipes');
    const data = await response.json();
    setRecipes(data);
  };

  const handleEdit = recipe => {
    setEditingRecipe(recipe);
  };

  const handleDelete = async recipeId => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
      }
    } catch (error) {
      console.error('Ошибка при удалении рецепта:', error);
    }
  };

  const handleUpdate = () => {
    setEditingRecipe(null);
    fetchRecipes();
  };

  return (
    <div>
      <h2>Рецепты</h2>
      {editingRecipe ? (
        <EditRecipeForm recipeId={editingRecipe._id} onRecipeUpdated={handleUpdate} />
      ) : (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe._id}>
              {recipe.name}
              <button onClick={() => handleEdit(recipe)}>Редактировать</button>
              <button onClick={() => handleDelete(recipe._id)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecipeList;
