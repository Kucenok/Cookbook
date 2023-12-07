import React from 'react';
import RecipeList from './components/RecipeList.js';
import AddRecipeForm from './components/AddRecipeForm.js';
import EditRecipeForm from './components/EditRecipeForm.js';
import './App.css';

function App() {
  return (
    <div>
      <h1>Кулинарная книга</h1>
      <AddRecipeForm />
      <EditRecipeForm />
      <RecipeList />
    </div>
  );
}

export default App;
