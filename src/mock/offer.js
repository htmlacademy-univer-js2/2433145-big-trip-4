import {getRandomArrayElement, getRandomValue} from '../utils/utils.js';
import {TYPE_POINTS, OFFERS} from '../const.js';

function getRandomOffer() {
  return ({
    'id': crypto.randomUUID(),
    'type': getRandomArrayElement(TYPE_POINTS),
    'title': getRandomArrayElement(OFFERS),
    'price': getRandomValue()
  });
}

export {getRandomOffer};
