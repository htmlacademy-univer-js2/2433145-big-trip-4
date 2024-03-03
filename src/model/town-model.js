import {getRandomTown} from '../mock/town.js';
import {TOWN_COUNTS} from '../const.js';

export default class TownModel {
  towns = Array.from({length: TOWN_COUNTS}, getRandomTown);

  getTowns() {
    return this.towns;
  }

  getTownNameById(townArr, id) {
    let temp = '';
    townArr.forEach((town) => {
      if (town.id === id) {
        temp = town.name;
      }
    });
    return temp;
  }

  getTownDescByID(townArr, id) {
    let temp = '';
    townArr.forEach((town) => {
      if (town.id === id) {
        temp = town.description;
      }
    });
    return temp;
  }
}
