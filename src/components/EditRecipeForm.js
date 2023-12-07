import React, { useState, useEffect } from 'react';

function EditRecipeForm({ recipeId, onRecipeUpdated }) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${recipeId}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Ошибка при получении рецепта:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleChange = e => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        onRecipeUpdated();
      }
    } catch (error) {
      console.error('Ошибка при редактировании рецепта:', error);
    }
  };

  if (!recipe) return 'Загрузка...';

  return (
    <form onSubmit={handleSubmit}>
      <h2>Редактировать Рецепт</h2>
      {/* Форма аналогична AddRecipeForm, но с начальными значениями из recipe и обновлением существующего рецепта */}
    </form>
  );
}

export default EditRecipeForm;
