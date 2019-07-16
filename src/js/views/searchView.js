import {elements} from './base';

export const getInput = () => elements.searhForm.value;
export const clearInput = () => {
    elements.searcInput.value = '';
};

export const clearResultList = () => {
    elements.resultList.innerHTML = '';
};

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markUp = `
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src=${recipe.image_url} alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
    </li>`;
    elements.resultList.insertAdjacentHTML('beforeend', markUp);
}
export const renderResult = recipes => {
    recipes.forEach(renderRecipe)
}