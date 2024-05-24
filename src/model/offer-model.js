import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';
// import { getRandomArrayElement, getRandomValue } from '../utils/utils.js';

export default class OfferModel extends Observable{
  #offers = null;
  #pointsApiService = null;

  constructor(pointsApiService) {
    super();
    // this.createOffers(type);
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

  // createOffers(type) {
  //   if (OFFERS[type]) {
  //     OFFERS[type].forEach((offerName) => {
  //       this.offers.push({
  //         title: offerName,
  //         price: getRandomValue(),
  //         isChecked: getRandomArrayElement([0, 1])
  //       });
  //     });
  //   }
  // }
}
