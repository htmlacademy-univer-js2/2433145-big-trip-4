import {getRandomPoint} from '../mock/point.js';
import { POINTS_COUNT } from '../const.js';
import {getRandomArrayElement} from '../utils/utils.js';
import TownModel from '../model/town-model.js';
import OfferModel from '../model/offer-model.js';

export default class PointModel {
  townModel = new TownModel();
  towns = this.townModel.getTowns();

  points = Array.from({length: POINTS_COUNT}, () => {
    const townID = getRandomArrayElement(this.towns).id;
    const point = (getRandomPoint(townID));
    point.destination = this.townModel.getTownNameById(this.towns, townID);
    const offerModel = new OfferModel(point.type);
    if (point.offers === 'not assigned') {
      point.offers = offerModel.getOffers();
    }
    else {
      offerModel.createOffers(point.offers);
      point.offers = offerModel.getOffers();
    }
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

