const POINTS_COUNT = 3;
const TOWN_COUNTS = 8;
const OFFERS_COUNT = 5;
const IMAGE_COUNT = 4;

const TYPE_POINTS = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Magnitogorsk', 'Chicago', 'Los Angeles', 'Moskow', 'Saint-Peterburg', 'Voronezh'];

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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export {POINTS_COUNT, TOWN_COUNTS, OFFERS_COUNT, IMAGE_COUNT, TYPE_POINTS, DESTINATIONS, FilterType, SortType, UserAction, UpdateType};
