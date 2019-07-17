import {elements} from './base';

export const getInput = () => elements.searhForm.value;
export const clearInput = () => {
    elements.searcInput.value = '';
    
};

export const clearResultList = () => {
    elements.resultList.innerHTML = '';
    elements.navigationParent.innerHTML= '';
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

const createButton = (type, page) => `
<button class="btn-inline results__btn--${type}" data-goto="${type === "prev"? page-1: page+1}">
    <span>Page ${type === 'prev'? page-1: page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev'? 'left': 'right'}"></use>
    </svg>
</button>`

const renderButtons = (page, numResults, resPerPage) =>{
    const pages = Math.round(numResults/ resPerPage);
    let button;
    if(page == 1 && pages > 1){
        button = createButton('next',page);
    }
    else if(page<pages){
        button = `${createButton('next', page)}${createButton('prev', page)}`

    }
    else if(page == pages && pages > 1){
        button = createButton('prev', page);
    }
    elements.navigationParent.insertAdjacentHTML('afterbegin', button);
}

export const renderResult = (recipes, page=1, resPerPage=10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe)
    renderButtons(page, recipes.length, resPerPage);
}