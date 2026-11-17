import { useState } from 'react';

function MyRecipesComponents({ recipe }) {

  const [showInstructions, setShowInstructions] = useState(false);

  return (

    <div>

      <h2>{recipe.strMeal}</h2>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width="250"
        
      />
      {Array.from({ length: 20 }, (_, index) => {
        const ingredient = recipe[`strIngredient${index + 1}`];
        const measure = recipe[`strMeasure${index + 1}`];

      if (!ingredient?.trim()) return null;

      return (
        <p key={index}>
          {ingredient} - {measure}
        </p>
      );

    })}
     <button onClick={() => setShowInstructions(!showInstructions)}>
        {showInstructions ? "Hide Instructions" : "Show Instructions"}
      </button>

      {showInstructions && (
        <p>{recipe.strInstructions}</p>
      )}
      
    </div>
    

  );
}

export default MyRecipesComponents;