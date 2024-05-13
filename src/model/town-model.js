import {getTownsArr} from '../mock/town.js';

export default class TownModel {
  #towns = getTownsArr();

  getTowns() {
    return this.#towns;
  }

  getTownNameById(id) {
    let temp = '';
    this.#towns.forEach((town) => {
      if (town.id === id) {
        temp = town.name;
      }
    });
    return temp;
  }

  getTownDescByID(id) {
    let temp = '';
    this.#towns.forEach((town) => {
      if (town.id === id) {
        temp = town.description;
      }
    });
    return temp;
  }

  getPhotosByID(id) {
    let temp = '';
    this.#towns.forEach((town) => {
      if (town.id === id) {
        temp = town.photos;
      }
    });
    return temp;
  }

  getIDByTownName(townName) {
    let temp = '';
    this.#towns.forEach((town) => {
      if (town.name === townName) {
        temp = town.id;
      }
    });
    return temp;
  }
}
