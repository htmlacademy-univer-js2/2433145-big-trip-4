import {getRandomPoint} from '../mock/point.js';
import { POINTS_COUNT } from '../const.js';
import {getRandomArrayElement, getDateDiff} from '../utils/utils.js';
import TownModel from '../model/town-model.js';
import OfferModel from '../model/offer-model.js';

export default class PointModel {
  townModel = null;
  offerModel = null;
  towns = null;
  points = null;

  constructor () {
    this.townModel = new TownModel();
    this.towns = this.townModel.getTowns();
    this.points = Array.from({length: POINTS_COUNT}, () => {
      const townID = getRandomArrayElement(this.towns).id;
      const point = (getRandomPoint(townID));
      this.offerModel = new OfferModel(point.type);
      if (point.offers === 'not assigned') {
        point.offers = this.offerModel.getOffers();
      }
      else {
        this.offerModel.createOffers(point.offers);
        point.offers = this.offerModel.getOffers();
      }
      point.destination = this.townModel.getTownNameById(townID);
      point.description = this.townModel.getTownDescByID(townID);
      point.photos = this.townModel.getPhotosByID(townID);
      point.duration = getDateDiff(point.dateFrom, point.dateTo);
      return point;
    });
  }

  getPoints() {
    return this.points;
  }

  getPoint() {
    return this.points[0];
  }
}

