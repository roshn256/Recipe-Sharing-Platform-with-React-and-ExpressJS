import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/recipes`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>🍽 Recipe Sharing Platform</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
