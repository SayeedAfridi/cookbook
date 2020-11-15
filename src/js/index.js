import Search from './models/Search'
import {elements, renderLoader, clearLoader} from './view/base'
import * as searchView from './view/searchView'
import Recipe from './models/Recipe'
import * as recipeView from './view/recipeView'
import List from './models/List'
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

elements.resultPages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline')
  if (btn) {
    const gotoPage = +btn.dataset.goto
    searchView.clearResults()
    searchView.renderResults(state.search.results, gotoPage)
  }
})

const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '')
  if (id) {
    //preapare the ui
    recipeView.clearRecipe()
    renderLoader(elements.recipe)
    if (state.search) searchView.highlightSelected(id)
    //create new recipe object
    state.recipe = new Recipe(id)

    //get recipe data
    await state.recipe.getRecipe()
    //render recipe
    clearLoader()
    recipeView.renderRecipe(state.recipe)
    console.log(state.recipe)
  }
}

window.addEventListener('load', controlRecipe)
window.addEventListener('hashchange', controlRecipe)

const controlList = () => {
  if (!state.list) {
    state.list = new List()
  }

  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(
      el.amount.us.value,
      el.amount.us.unit,
      el.name
    )
    console.log(item)
  })
}

// event listener on recipe container
elements.recipe.addEventListener('click', (e) => {
  if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc')
    recipeView.updateServingsIngs(state.recipe)
  } else if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    state.recipe.updateServings('dec')
    recipeView.updateServingsIngs(state.recipe)
  } else if (e.target.matches('.addto-shopping, .addto-shopping *')) {
    controlList()
  }
})
