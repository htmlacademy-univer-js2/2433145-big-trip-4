const POINTS_COUNT = 3;
const TOWN_COUNTS = 8;
const OFFERS_COUNT = 5;
const IMAGE_COUNT = 4;

const TYPE_POINTS = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Magnitogorsk', 'Chicago', 'Los Angeles', 'Moskow', 'Saint-Peterburg', 'Voronezh'];
const OFFERS = {
  'taxi': ['Switch to comfort class', 'Switch to business class', 'Choose seats', 'Add luggage', 'Add meal'],
  'bus': ['Add meal'],
  'train': ['Switch to comfort class', 'Switch to business class', 'Choose seats', 'Add luggage', 'Add meal'],
  'ship': ['Switch to comfort class', 'Switch to business class', 'Choose seats', 'Add luggage', 'Add meal'],
  'drive': [],
  'flight': ['Switch to comfort class', 'Switch to business class', 'Choose seats', 'Add luggage', 'Add meal'],
  'check-in': [],
  'sightseeing': ['Travel by train', 'Add meal'],
  'restaurant': []
};
const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DATE: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export {POINTS_COUNT, TOWN_COUNTS, OFFERS_COUNT, IMAGE_COUNT, TYPE_POINTS, DESTINATIONS, OFFERS, DESCRIPTION, FilterType, SortType};
