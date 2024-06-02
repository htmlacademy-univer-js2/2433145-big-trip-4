const POINTS_COUNT = 3;
const TOWN_COUNTS = 8;
const OFFERS_COUNT = 5;
const IMAGE_COUNT = 4;

const TYPE_POINTS = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Magnitogorsk', 'Chicago', 'Los Angeles', 'Moskow', 'Saint-Peterburg', 'Voronezh'];

const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SORT_TYPE = {
  DATE: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const USER_ACTION = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const DEFAULT_FORM_VALUES = {
  type: 'flight',
  basePrice: 0,
  offers: {offers: [
    {id: '60f8e796-c719-4bba-a845-507fc2c20e6d', title: 'Choose meal', price: 140},
    {id: '98dfafcf-5613-45f1-867a-7045c4292e8e', title: 'Choose seats', price: 173},
    {id: 'c0a49d06-b873-4847-b170-7c2a002dc668', title: 'Upgrade to comfort class', price: 159},
    {id: 'a850395c-a7d6-4f9c-8cb2-7ef48b5a5fef', title: 'Upgrade to business class', price: 179},
    {id: 'b837a4c4-5559-4751-a18d-2bb09f8c6ec9', title: 'Add luggage', price: 52},
    {id: 'b57ad935-0c5b-45d4-b76a-4870b6ac208c', title: 'Business lounge', price: 166}]},
  pictures: [],
  isFavorite: true,
  dateFrom: new Date(2024, 5, 30),
  dateTo: new Date(2024, 5, 31),
};

export {POINTS_COUNT, TOWN_COUNTS, OFFERS_COUNT, IMAGE_COUNT, TYPE_POINTS, DESTINATIONS, FILTER_TYPE, SORT_TYPE, USER_ACTION, UPDATE_TYPE, DEFAULT_FORM_VALUES};
