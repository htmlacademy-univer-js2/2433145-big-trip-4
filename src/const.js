import { getRandomValue } from './utils/utils.js';

const POINTS_COUNT = 3;
const TOWN_COUNTS = 8;
const OFFERS_COUNT = 5;
const IMAGE_COUNT = 4;
const IMAGES = [];

const TYPE_POINTS = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Magnitogorsk', 'Chicago', 'Los Angeles', 'Moskow', 'Saint-Peterburg'];
const OFFERS = {
  'Taxi': ['Switch to comfort class', 'Switch to business class', 'Choose seats', 'Add luggage', 'Add meal'],
  'Bus': ['Add meal'],
  'Train': ['Switch to comfort class', 'Switch to business class', 'Choose seats', 'Add luggage', 'Add meal'],
  'Ship': ['Switch to comfort class', 'Switch to business class', 'Choose seats', 'Add luggage', 'Add meal'],
  'Drive': [],
  'Flight': ['Switch to comfort class', 'Switch to business class', 'Choose seats', 'Add luggage', 'Add meal'],
  'Check-in': [],
  'Sightseeing': ['Travel by train', 'Add meal'],
  'Restaurant': []
};
const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const IMAGE_URL = 'https://loremflickr.com/248/152?random=';
for (let i = 0; i < IMAGE_COUNT; i++){
  IMAGES.push(`${IMAGE_URL}${getRandomValue()}`);
}

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DATE: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offer'
};

export {POINTS_COUNT, TOWN_COUNTS, OFFERS_COUNT, IMAGE_COUNT, TYPE_POINTS, DESTINATIONS, OFFERS, DESCRIPTION, IMAGE_URL, IMAGES, FilterType, SortType};
