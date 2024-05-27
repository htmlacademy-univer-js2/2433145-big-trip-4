import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class OfferModel extends Observable{
  #offers = null;
  #pointsApiService = null;

  constructor(pointsApiService) {
    super();
    this.#offers = [];
    this.#pointsApiService = pointsApiService;
  }

  init() {
    try {
      const offers = this.#pointsApiService.offers;
      this.#offers = offers;
    } catch(err) {
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  }

  getOffers() {
    return this.offers;
  }

  getOfferByID(offersArr, id) {
    let temp = '';
    offersArr.forEach((offer) => {
      if (offer.id === id) {
        temp = offer;
      }
    });
    return temp;
  }

  getOffersIDs(offersArr) {
    this.offersIds = offersArr.map((offer) => offer.id);
    return this.offersIds;
  }

  updateOffers(newType) {
    this.offers = [];
    this.createOffers(newType);
    return this.offers;
  }
}
