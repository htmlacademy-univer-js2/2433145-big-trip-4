import {UPDATE_TYPE} from '../const.js';
import Observable from '../framework/observable.js';

export default class TownModel extends Observable{
  #destinations = null;
  #pointsApiService = null;

  constructor(pointsApiService) {
    super();
    this.#destinations = [];
    this.#pointsApiService = pointsApiService;
  }

  get towns() {
    return this.#destinations;
  }

  async init() {
    try {
      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = destinations;
    } catch(err) {
      this.#destinations = [];
    }
    this._notify(UPDATE_TYPE.INIT);
  }

  getTownNameById(id) {
    let temp = '';
    this.#destinations.forEach((town) => {
      if (town.id === id) {
        temp = town.name;
      }
    });
    return temp;
  }

  getTownDescByID(id) {
    let temp = '';
    this.#destinations.forEach((town) => {
      if (town.id === id) {
        temp = town.description;
      }
    });
    return temp;
  }

  getPhotosByID(id) {
    let temp = '';
    this.#destinations.forEach((town) => {
      if (town.id === id) {
        temp = town.pictures;
      }
    });
    return temp;
  }

  getIDByTownName(townName) {
    let temp = '';
    this.#destinations.forEach((town) => {
      if (town.name === townName) {
        temp = town.id;
      }
    });
    return temp;
  }
}
