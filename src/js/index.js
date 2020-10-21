import Search from './models/Search'
import {elements, renderLoader, clearLoader} from './view/base'
import * as searchView from './view/searchView'

/*
search object
current recipe
shopping list
liked recipes
*/

const state = {}

const controlSearch = async (e) => {
  e.preventDefault()
  //get the query
  const query = searchView.getInput()
  if (query) {
    state.search = new Search(query)
    // prepare the ui
    searchView.clearInput()
    searchView.clearResults()
    renderLoader(elements.resultsList)
    //search recipe
    await state.search.getRecipies()
    clearLoader()
    //render results
    searchView.renderResults(state.search.results)
  }
}

elements.searchForm.addEventListener('submit', controlSearch)
