import { useEffect, useState } from 'react';
import './App.css';
import video from './ovenfire.mp4';
import MyRecipesComponents from './MyRecipesComponents';

function App() {

  const [recipes, setRecipes] = useState([]);
  const [mySearch, setMySearch] = useState("");

  // Initial recipes
  useEffect(() => {
    const getRecipes = async () => {

      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=avocado'
      );

      const data = await response.json();

      console.log(data.meals);

      setRecipes(data.meals || []);
    };

    getRecipes();

  }, []);


  // Search input
  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  };


  // Search button
  const searchRecipes = async (e) => {

    e.preventDefault();

    if (!mySearch.trim()) {
      return;
    }

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mySearch}`
    );

    const data = await response.json();

    console.log(data.meals);

    setRecipes(data.meals || []);
  };


  return (

    <div className="App">

      <div className="container">

        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>


        <h1>Find a Recipe</h1>


        <div className="container">

          <form onSubmit={searchRecipes}>

            <input
              className="search"
              placeholder="Search..."
              onChange={myRecipeSearch}
              value={mySearch}
            />

          </form>

        </div>


        <div className="container">

          <button onClick={searchRecipes}>

            <img
              src="https://img.icons8.com/fluency/48/000000/fry.png"
              alt="icon"
            />

          </button>

        </div>


        {recipes.map(recipe => (

          <div key={recipe.idMeal}>

            <MyRecipesComponents recipe={recipe} />

          </div>

        ))}


      </div>

    </div>

  );
}

export default App;

