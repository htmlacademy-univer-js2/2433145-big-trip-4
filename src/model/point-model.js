import TownModel from '../model/town-model.js';
import OfferModel from '../model/offer-model.js';
import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';
import { getDateDiff } from '../utils/utils.js';
//исправить позже

export default class PointModel extends Observable{
  townModel = null;
  #offerModel = null;
  #towns = null;
  #offers = null;
  #points = null;
  #pointsApiService = null;

  constructor (pointsApiService) {
    super();

    this.#pointsApiService = pointsApiService;
    this.#offerModel = new OfferModel(this.#pointsApiService);
    this.townModel = new TownModel(this.#pointsApiService);
    this.#offerModel.init();
    this.townModel.init();
    this.#towns = this.townModel.towns;
    this.#points = [];
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }
    this._notify(UpdateType.INIT);
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

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      isFavorite: point['is_favorite'],
      basePrice: point['base_price'],
      duration: getDateDiff(point['date_from'], point['date_to']),
    };

    delete adaptedPoint['date_to'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['base_price'];

    return adaptedPoint;
  }

  get points() {
    return this.#points;
  }
}
