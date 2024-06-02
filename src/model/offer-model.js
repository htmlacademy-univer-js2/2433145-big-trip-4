import { UPDATE_TYPE } from '../const.js';
import Observable from '../framework/observable.js';

export default class OfferModel extends Observable{
  #offers = null;
  #pointsApiService = null;

  constructor(pointsApiService) {
    super();
    this.#offers = [];
    this.#pointsApiService = pointsApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const offers = await this.#pointsApiService.offers;
      this.#offers = offers;
    } catch(err) {
      this.#offers = [];
    }
    this._notify(UPDATE_TYPE.INIT);
  }

  getOfferByType(offersArr, type) {
    let temp = '';
    offersArr.forEach((offer) => {
      if (offer.type === type) {
        temp = offer;
      }
    });
    return temp;
  }

  getOffersIDs(offersArr) {
    this.offersIds = offersArr.map((offer) => offer.id);
    return this.offersIds;
  }
}
