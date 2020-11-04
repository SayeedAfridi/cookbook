import axios from 'axios'
import {url, key} from '../config'

export default class Recipe {
  constructor(id) {
    this.id = id
  }

  async getRecipe() {
    try {
      const infoRes = await axios.get(
        `${url}/recipes/${this.id}/information?apiKey=${key}`
      )
      const ingRes = await axios.get(
        `${url}/recipes/${this.id}/ingredientWidget.json?apiKey=${key}`
      )
      this.title = infoRes.data.title
      this.img = infoRes.data.image
      this.url = infoRes.data.sourceUrl
      this.servings = infoRes.data.servings
      this.cookingTime = infoRes.data.readyInMinutes
      this.ingredients = ingRes.data.ingredients
      this.instructions = infoRes.data.instructions
    } catch (err) {
      console.log(err)
    }
  }
}
