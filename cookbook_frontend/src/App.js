import React from 'react';
import NewRecipeForm from './components/form';
import IndividualRecipe from './components/individual_recipe';

class App extends React.Component {
    state = {
        recipes: null
    }
    componentDidMount() {
        const url = 'http://127.0.0.1:5000/API/recipe/all';
        const options = {
            method: "GET"
        };
        let rs = [];
        fetch(url, options)
            .then(response => response.json())
            .then((response) => {
                for (let r of response) {
                    rs.push(r);
                }
            })
            .catch((error) => console.log(error))
        ;
        this.setState({recipes: rs});
    }
    render()  {
        console.log(this.state.recipes);
        if (this.state.recipes !== null)
            return (
                <React.Fragment>
                    <NewRecipeForm/>
                    {this.state.recipes.map(
                        recipe =>  <IndividualRecipe recipeId = {recipe.id}/>
                    )}
                </React.Fragment>
            );
        else return <div>{"hello"}</div>;
    }
}

export default App;
