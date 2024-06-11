const POINTS_COUNT = 3;
const TOWN_COUNTS = 8;
const OFFERS_COUNT = 5;
const IMAGE_COUNT = 4;

const TYPE_POINTS = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

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
  offers: {offers: []},
  pictures: [],
  isFavorite: true,
  dateFrom: new Date(2024, 5, 30),
  dateTo: new Date(2024, 5, 31),
};

export {POINTS_COUNT, TOWN_COUNTS, OFFERS_COUNT, IMAGE_COUNT, TYPE_POINTS, FILTER_TYPE, SORT_TYPE, USER_ACTION, UPDATE_TYPE, DEFAULT_FORM_VALUES};
