import {getRandomArrayElement, getRandomValue} from '../utils/utils.js';
import {DESTINATIONS, DESCRIPTION} from '../const.js';

function getRandomTown() {
  return ({
    'id': crypto.randomUUID(),
    'name': getRandomArrayElement(DESTINATIONS),
    'photo': `https://loremflickr.com/248/152?random=${getRandomValue()}`,
    'description': getRandomArrayElement(DESCRIPTION.split('.')).repeat(getRandomValue(1, 5))
  });
}

export {getRandomTown};
