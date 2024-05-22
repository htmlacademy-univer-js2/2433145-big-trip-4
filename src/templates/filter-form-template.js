import {createFilterItemTemplate} from '../templates/filter-item-template';

function createFilterFormTemplate (filters, currentFilter) {
  return `<form class="trip-filters" action="#" method="get">
  ${filters.map((filter) => createFilterItemTemplate(filter, currentFilter)).join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
}

export {createFilterFormTemplate};
