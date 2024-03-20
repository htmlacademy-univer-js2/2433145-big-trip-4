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

export {getRandomPoint};
