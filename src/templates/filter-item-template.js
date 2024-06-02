function createFilterItemTemplate (filter, currentFilterType, isDisabled) {
  return `<div class="trip-filters__filter">
            <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" ${isDisabled ? 'disabled' : ''} ${filter === currentFilterType ? 'checked' : ''} value="${filter}">
            <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
          </div>`;
}


export {createFilterItemTemplate};
