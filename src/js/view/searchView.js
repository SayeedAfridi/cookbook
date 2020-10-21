import {elements} from './base'

export const getInput = () => elements.searchInput.value

const baseUrl = 'https://spoonacular.com/recipeImages/'

export const clearInput = () => (elements.searchInput.value = '')

export const clearResults = () => (elements.resultsList.innerHTML = '')

const renderRecipe = (recipe) => {
  const markup = `
  <li>
      <a class="likes__link" href="#${recipe.id}">
          <figure class="likes__fig">
              <img src="${baseUrl}${recipe.image}" alt="${recipe.title}">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${recipe.title}</h4>
              <p class="likes__author">Ready in: ${recipe.readyInMinutes} mins</p>
          </div>
      </a>
  </li>
`

  elements.resultsList.insertAdjacentHTML('beforeend', markup)
}

export const renderResults = (recipies) => {
  recipies.forEach(renderRecipe)
}
