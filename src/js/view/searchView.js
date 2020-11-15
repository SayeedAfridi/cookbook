import {elements} from './base'

export const getInput = () => elements.searchInput.value

const baseUrl = 'https://spoonacular.com/recipeImages/'

export const clearInput = () => (elements.searchInput.value = '')

export const clearResults = () => {
  elements.resultsList.innerHTML = ''
  elements.resultPages.innerHTML = ''
}

//Fruit pizza djadjkfal
//0+5=5
//5+5=10

export const highlightSelected = (id) => {
  const resultArr = Array.from(document.querySelectorAll('.results__link'))
  resultArr.forEach((el) => el.classList.remove('results__link--active'))
  document
    .querySelector(`.results__link[href="#${id}"]`)
    .classList.add('results__link--active')
}

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = []
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur)
      }
      return acc + cur.length
    }, 0)

    return `${newTitle.join(' ')}...`
  }
  return title
}

const renderRecipe = (recipe) => {
  const markup = `
  <li>
      <a class="results__link" href="#${recipe.id}">
          <figure class="results__fig">
              <img src="${baseUrl}${recipe.image}" alt="${recipe.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
              <p class="results__author">Ready in: ${
                recipe.readyInMinutes
              } mins</p>
          </div>
      </a>
  </li>
`

  elements.resultsList.insertAdjacentHTML('beforeend', markup)
}

//type next or prev

const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${
  type === 'prev' ? page - 1 : page + 1
} >
  <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
  <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${
        type === 'prev' ? 'left' : 'right'
      }"></use>
  </svg>
</button>
`

const renderButton = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage)
  let button
  if (page === 1 && pages > 1) {
    //only button goto next page
    button = createButton(page, 'next')
  } else if (page < pages) {
    //both button
    button = `${createButton(page, 'prev')}${createButton(page, 'next')}`
  } else if (page === pages && pages > 1) {
    //only button goto prev page
    button = createButton(page, 'prev')
  }
  elements.resultPages.insertAdjacentHTML('afterbegin', button)
}

export const renderResults = (recipies, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage
  const end = page * resPerPage
  recipies.slice(start, end).forEach(renderRecipe)
  renderButton(page, recipies.length, resPerPage)
}
