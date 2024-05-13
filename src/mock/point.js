import {getRandomArrayElement, getRandomValue, getDate} from '../utils/utils.js';
import { TYPE_POINTS } from '../const.js';

function getRandomPoint(destinationID, offersID) {
  return ({
    'id': crypto.randomUUID(),
    'basePrice': getRandomValue(),
    'dateFrom': getDate({next: false}),
    'dateTo': getDate({next: true}),
    'destination': destinationID,
    'isFavorite': getRandomArrayElement([0, 1]),
    'offers': offersID,
    'type': getRandomArrayElement(TYPE_POINTS)
  });
}

function sortPointsByPrice(pointA, pointB) {
  if (pointA.basePrice < pointB.basePrice) {
    return 1;
  }
  if (pointA.basePrice > pointB.basePrice) {
    return -1;
  }
  return 0;
}

function sortPointsByTime(pointA, pointB) {
  const durationA = pointA.dateTo - pointA.dateFrom;
  const durationB = pointB.dateTo - pointB.dateFrom;
  if (durationA < durationB) {
    return 1;
  }

  if (durationA > durationB) {
    return -1;
  }
  return 0;
}

export {getRandomPoint, sortPointsByTime, sortPointsByPrice};
