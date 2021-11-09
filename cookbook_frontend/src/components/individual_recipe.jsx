import React from 'react';

class IndividualRecipe extends React.Component {
    state = {
        recipe: null
    }
    getIndividualRecipe = () => {
        const url = 'http://127.0.0.1:5000/API/recipe/' + this.props.recipeId;
        const options = {
            method: "GET"
        };
        fetch(url, options)
            .then(response => response.json())
            .then((response) => this.setState({recipe: response.recipe}))
            .catch((error) => console.log(error))
        ;
    }
    componentDidMount() {
        this.getIndividualRecipe();
    }

    render() {
        if (this.state.recipe !== null) {
            return (<div className = "container-md bg-light">
            <h1> How to make {this.state.recipe.name}</h1>
            <p>-By {this.state.recipe.contributor_name}</p>
            <q>{this.state.recipe.description}</q>
            <p>This recipe takes only 
                <span className = "badge bg-primary">
                    {this.state.recipe.prep_time} minutes
                </span>
                , makes <span className = "badge bg-primary">
                    {this.state.recipe.quantity} {this.state.recipe.unit}
                </span> 
                and is {this.state.recipe.diff} to make.
            </p>
            <h2>Ingredients</h2>
            <ul>
                {this.state.recipe.recipe_ingredients.map(
                    i => <li key = {i.english_name}>
                        {i.quantity} {i.unit} of {i.english_name} (
                            <span lang="hi">
                                {i.hindi_name_latin}, {i.hindi_name_devnagari}
                            </span>
                        )
                    </li>
                )}
            </ul>
            <h2>Steps</h2>
            <ol>
                {this.state.recipe.recipe_steps.map(
                    step => <li key = {step.serial_number}>
                        {step.instruction}
                    </li>
                )}
            </ol>
        </div>);
        }
        else {
            return <div className = "container-md bg-light">Invalid ID</div>
        }
    }
}
 
export default IndividualRecipe;