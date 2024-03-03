import {getRandomPoint} from '../mock/point.js';
import { OFFERS_COUNT, POINTS_COUNT } from '../const.js';
import {getRandomArrayElement, getRandomValue} from '../utils.js';
import TownModel from '../model/town-model.js';
import OfferModel from '../model/offer-model.js';

export default class PointModel {
  townModel = new TownModel();
  towns = this.townModel.getTowns();

  points = Array.from({length: POINTS_COUNT}, () => {
    const offerModel = new OfferModel(getRandomValue(0, OFFERS_COUNT));
    const offersArr = offerModel.getOffers();
    const offersID = offerModel.getOffersIDs(offersArr);
    const offers = [];
    offersID.forEach((offerID) => {
      offers.push(offerModel.getOfferByID(offersArr, offerID));
    });

    const townID = getRandomArrayElement(this.towns).id;

    const point = (getRandomPoint(townID, offersID));
    point.destination = this.townModel.getTownNameById(this.towns, townID);
    point.offers = offers;
    point.description = this.townModel.getTownDescByID(this.towns, townID);
    return point;
  });

  getPoints() {
    return this.points;
  }

  getPoint() {
    return this.points[0];
  }
}

