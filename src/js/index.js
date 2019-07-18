import Search from "./models/Search";
import Recipe from "./models/recipe";
import { elements, renderLoader, clearLoader } from "./views/base";
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
/*

*/ 
const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();
    if(query){
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResultList();
        renderLoader(elements.searhRes);
        try{
            await state.search.getResults();
            clearLoader();
            searchView.renderResult(state.search.result);
        }
        catch(error){
            alert('Something wrong in search')
        }
    }
    

}

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    if(id){
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        state.recipe = new Recipe(id);
        try{
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            state.recipe.calcTime();
            state.recipe.calcServings();
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }
        catch(error){
            alert('Failed to get recipe')
        }
        console.log(state.recipe);
    }
    
}

elements.searcInput.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

elements.navigationParent.addEventListener('click',e=>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goto = parseInt(btn.dataset.goto, 10);
        searchView.clearResultList();
        searchView.renderResult(state.search.result, goto);
    }
});

// const r = new Recipe(46956);
// r.getRecipe()

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
});
