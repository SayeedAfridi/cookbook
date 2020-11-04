import axios from 'axios'
import {url, key} from '../config'

export default class Search {
  constructor(query) {
    this.query = query
  }

  async getRecipies() {
    try {
      const res = await axios.get(
        `${url}/recipes/search?query=${this.query}&number=30&apiKey=${key}`
      )
      this.results = res.data.results
    } catch (error) {
      console.log(error)
    }
  }
}
