import Search from "./models/Search";
import { elements, renderLoader, clearLoader } from "./views/base";
import * as searchView from './views/searchView'
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
        await state.search.getResults();
        clearLoader();
        searchView.renderResult(state.search.result);
        console.log(state.search.result);
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