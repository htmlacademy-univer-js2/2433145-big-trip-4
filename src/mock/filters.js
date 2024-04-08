import { filter } from '../utils/filter.js';

function generateFilter(points) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      exists: points.some(filterPoints)
    })
  );
}

export {generateFilter};
