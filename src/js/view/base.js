export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  resultsList: document.querySelector('.results__list'),
  resultPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
}

export const elementString = {
  loader: 'loader',
}

export const renderLoader = (parent) => {
  const markup = `
  <div class="${elementString.loader}">
    <svg>
        <use href="img/icons.svg#icon-cw"></use>
    </svg>
  </div>
  `
  parent.insertAdjacentHTML('afterbegin', markup)
}

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementString.loader}`)
  loader.parentNode.removeChild(loader)
}
