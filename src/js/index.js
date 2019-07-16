import Search from "./models/Search";
import { elements } from "./views/base";
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
        await state.search.getResults();
        searchView.renderResult(state.search.result)
        console.log(state.search.result);
    }
    

}

elements.searcInput.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});
