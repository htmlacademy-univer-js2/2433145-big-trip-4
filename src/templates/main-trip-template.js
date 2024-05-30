import {getMonthAndDate} from '../utils/utils.js';

function createMainTripTemplate (firstTown, secondTown, thirdTown, totalPrice, firstDate, secondDate) {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${firstTown} &mdash; ${secondTown} &mdash; ${thirdTown}</h1>

    <p class="trip-info__dates">${getMonthAndDate(firstDate)}&nbsp;&mdash;&nbsp;${getMonthAndDate(secondDate)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>
</section>`;
}

export {createMainTripTemplate};
