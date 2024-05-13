function createSortItemTemplate (sort) {
  return `<div class="trip-sort__item  trip-sort__item--${sort}">
	<input id="sort-${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" ${isAvailible(sort)} ${isChecked(sort)}>
	<label class="trip-sort__btn" for="sort-${sort}" data-sort-type="${sort}">${sort}</label>
  </div>`;
}

function isAvailible (sort) {
  return sort === 'event' || sort === 'offer' ? 'disabled' : '';
}

function isChecked(sort) {
  return sort === 'day' ? 'checked' : '';
}

export {createSortItemTemplate};
