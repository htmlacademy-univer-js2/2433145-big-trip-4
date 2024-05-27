// import {getRandomArrayElement, getRandomValue} from '../utils/utils.js';
// import {DESTINATIONS, DESCRIPTION, IMAGE_COUNT} from '../const.js';

// function getTownsArr() {
//   const towns = [];
//   DESTINATIONS.forEach((town) => {
//     towns.push({
//       'id': crypto.randomUUID(),
//       'name': town,
//       'photos': getRandomPhotos(),
//       'description': getRandomArrayElement(DESCRIPTION.split('.')).repeat(getRandomValue(1, 5))
//     });
//   });
//   return towns;
// }

// function getRandomPhotos () {
//   const images = [];
//   for (let i = 0; i < IMAGE_COUNT; i++){
//     images.push(`https://loremflickr.com/248/152?random=${getRandomValue()}`);
//   }
//   return images;
// }

// export {getTownsArr};
