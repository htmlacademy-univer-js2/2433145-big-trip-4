import {getRandomPoint} from '../mock/point.js';
import { POINTS_COUNT } from '../const.js';
import {getRandomArrayElement, getDateDiff} from '../utils/utils.js';
import TownModel from '../model/town-model.js';
import OfferModel from '../model/offer-model.js';
import Observable from '../framework/observable.js';

export default class PointModel extends Observable{
  townModel = null;
  #offerModel = null;
  #towns = null;
  #points = null;

  constructor () {
    super();
    this.townModel = new TownModel();
    this.#towns = this.townModel.getTowns();
    this.#points = Array.from({length: POINTS_COUNT}, () => {
      const townID = getRandomArrayElement(this.#towns).id;
      const point = (getRandomPoint(townID));
      this.#offerModel = new OfferModel(point.type);
      if (point.offers === 'not assigned') {
        point.offers = this.#offerModel.getOffers();
      }
      else {
        this.#offerModel.createOffers(point.offers);
        point.offers = this.#offerModel.getOffers();
      }
      point.destination = this.townModel.getTownNameById(townID);
      point.description = this.townModel.getTownDescByID(townID);
      point.photos = this.townModel.getPhotosByID(townID);
      point.duration = getDateDiff(point.dateFrom, point.dateTo);
      return point;
    });
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [update, ...this.#points];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  get points() {
    return this.#points;
  }
}
