// import {getTownsArr} from '../mock/town.js';
import {UpdateType} from '../const.js';
import Observable from '../framework/observable.js';

export default class TownModel extends Observable{
  #destinations = null;
  #pointsApiService = null;

  constructor(pointsApiService) {
    super();
    this.#destinations = [];
    this.#pointsApiService = pointsApiService;
  }

  init() {
    this.#pointsApiService.destinations.then((destinations) => {
      this.#destinations = destinations;
    }).catch((err) => err);
    this._notify(UpdateType.INIT);
    // try {
    //   const destinations = this.#pointsApiService.destinations;
    //   this.#destinations = destinations;
    // } catch(err) {
    //   this.#destinations = [];
    // }
    // this._notify(UpdateType.INIT);
  }

  get towns() {
    return this.#destinations;
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
        temp = town.photos;
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
