import LoadingAnimation from '../../loadingAnimation/loadingAnimation';
import RecipeCard from '../recipeCard/recipeCard';
import './recipeCards.css';

export default function RecipeCards({ recipes }: { recipes: recipeMeta[] }) {
    if (recipes === null) return <LoadingAnimation />;
    else if (recipes.length === 0)
        return <div className='util-centered'>No recipes found :(</div>;
    else
        return (
            <div className='recipe-cards'>
                {recipes.map(r => (
                    <RecipeCard key={r.id} recipe={r} />
                ))}
            </div>
        );
}

