import dayjs from 'dayjs';

// let date = dayjs().subtract(getRandomValue(0, 31), 'day').toDate();

// function getDate({next}) {
//   const minsGap = getRandomValue(0, 60);
//   const hoursGap = getRandomValue(0, 11);

//   if (next) {
//     date = dayjs(date)
//       .add(minsGap, 'minute')
//       .add(hoursGap, 'hour')
//       .toDate();
//   }

//   return date;
// }

function getDateDiff(dateFrom, dateTo) {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom), 'm');

  if (Math.ceil(diff / 1440) > 1){
    return `${Math.ceil(diff / 1440)} D`;
  }

  if (Math.ceil(diff / 60) > 1){
    return `${Math.ceil(diff / 60)} H`;
  }
  return `${Math.ceil(diff)} M`;
}

function getTime(dt) {
  return dayjs(dt).format('hh:mm');
}

function getMonthAndDate(dt) {
  return dayjs(dt).format('MMM DD');
}

function getFullDate(dt) {
  return dayjs(dt).format('DD/MM/YY hh:mm');
}

// function getRandomArrayElement(items) {
//   return items[Math.floor(Math.random() * items.length)];
// }

// function getRandomValue(minimum = 0, maximum = 3000) {
//   return Math.floor(Math.random() * (maximum - minimum) + minimum);
// }

function sortPointsByPrice(pointA, pointB) {
  if (pointA.basePrice < pointB.basePrice) {
    return 1;
  }
  if (pointA.basePrice > pointB.basePrice) {
    return -1;
  }
  return 0;
}

function sortPointsByTime(pointA, pointB) {
  const durationA = pointA.dateTo - pointA.dateFrom;
  const durationB = pointB.dateTo - pointB.dateFrom;
  if (durationA < durationB) {
    return 1;
  }

  if (durationA > durationB) {
    return -1;
  }
  return 0;
}

function isEscapeButton (evt) {
  return evt.key === 'Escape';
}

export {getDateDiff, getTime, getMonthAndDate, getFullDate, isEscapeButton, sortPointsByPrice, sortPointsByTime};
