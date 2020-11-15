import {v4 as uuidv4} from 'uuid'

export default class List {
  constructor() {
    this.items = []
  }

  addItem(value, unit, ingredient) {
    const item = {
      id: uuidv4(),
      value,
      unit,
      ingredient,
    }
    this.items.push(item)
    return item
  }

  deleteItem(id) {
    const index = this.items.findIndex((el) => el.id === id)
    this.items.splice(index, 1)
  }

  updateItem(id, newValue) {
    const item = this.items.find((el) => el.id === id)
    if (item) {
      item.value = newValue
    }
  }
}
