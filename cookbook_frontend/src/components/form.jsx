import React from 'react';

class NewRecipeForm extends React.Component {
    render() { 
        return (<div className = "container-md border">
            <h1>Fill the form to enter a new recipe!</h1>
            <input type="text" className="form-control" />
        </div>);
    }
}
 
export default NewRecipeForm;