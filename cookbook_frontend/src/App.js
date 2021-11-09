import React from 'react';
import NewRecipeForm from './components/form';
import IndividualRecipe from './components/individual_recipe';

function App() {
  return (
    <React.Fragment>
        <NewRecipeForm/>
        <IndividualRecipe recipeId = "3"/>
    </React.Fragment>
  );
}

export default App;
