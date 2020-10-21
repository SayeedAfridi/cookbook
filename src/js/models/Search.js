import axios from 'axios'

const searchUrl = 'https://api.spoonacular.com/recipes/search?'
const key = 'bf4d2097744b4ae6b1cd3086990bd3a9'

export default class Search {
  constructor(query) {
    this.query = query
  }

  async getRecipies() {
    try {
      const res = await axios.get(
        `${searchUrl}query=${this.query}&number=30&apiKey=${key}`
      )
      this.results = res.data.results
    } catch (error) {
      console.log(error)
    }
  }
}
