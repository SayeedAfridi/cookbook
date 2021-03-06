import {elements} from './base'
import {Fraction} from 'fractional'

const createIng = (ing) => `
<li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${formatValue(ing.amount.us.value)}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${ing.amount.us.unit}</span>
        ${ing.name}
    </div>
</li>
`

const formatValue = (value) => {
  if (value) {
    const newValue = (value * 100) / 100
    const [int, dec] = newValue
      .toString()
      .split('.')
      .map((el) => parseInt(el, 10))
    if (!dec) return newValue
    if (int === 0) {
      return new Fraction(newValue).toString()
    } else {
      const fr = new Fraction(newValue - int)
      return `${int} ${fr.numerator}/${fr.denominator}`
    }
  }
}

export const clearRecipe = () => (elements.recipe.innerHTML = '')

export const renderRecipe = (recipe) => {
  const markup = `
  <figure class="recipe__fig">
      <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
          <span>${recipe.title}</span>
      </h1>
  </figure>
  <div class="recipe__details">
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="img/icons.svg#icon-stopwatch"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text"> minutes</span>
      </div>
      <div class="recipe__info">
          <svg class="recipe__info-icon">
              <use href="img/icons.svg#icon-man"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.servings
          }</span>
          <span class="recipe__info-text"> servings</span>

          <div class="recipe__info-buttons">
              <button class="btn-tiny btn-decrease">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-minus"></use>
                  </svg>
              </button>
              <button class="btn-tiny btn-increase">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-plus"></use>
                  </svg>
              </button>
          </div>

      </div>
      <button class="recipe__love">
          <svg class="header__likes">
              <use href="img/icons.svg#icon-heart-outlined"></use>
          </svg>
      </button>
  </div>



  <div class="recipe__ingredients">
      <ul class="recipe__ingredient-list">
        ${recipe.ingredients.map(createIng).join('')}
      </ul>

      <button class="btn-small recipe__btn addto-shopping">
          <svg class="search__icon">
              <use href="img/icons.svg#icon-shopping-cart"></use>
          </svg>
          <span>Add to shopping list</span>
      </button>
  </div>

  <div class="recipe__directions">
      <h2 class="heading-2">How to cook it</h2>
      <p class="recipe__directions-text">
          To get the instructions please clik on direction.
      </p>
      <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-right"></use>
          </svg>

      </a>
  </div>
`

  elements.recipe.insertAdjacentHTML('afterbegin', markup)
}

export const updateServingsIngs = (recipe) => {
  document.querySelector('.recipe__info-data--people').textContent =
    recipe.servings

  const ingArr = Array.from(document.querySelectorAll('.recipe__count'))
  ingArr.forEach(
    (el, i) =>
      (el.textContent = formatValue(recipe.ingredients[i].amount.us.value))
  )
}
