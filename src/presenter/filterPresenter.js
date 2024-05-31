import {render, replace, remove} from '../framework/render.js';
import FilterFormView from '../view/filter-form-view.js';
import {FilterType, UpdateType} from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointModel = null;
  #filterComponent = null;

  constructor({filterContainer, filterModel, pointModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return Object.values(FilterType).map((type) => type);
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    const filterElementsCounts = this.#pointModel.countFilteredPoints();
    this.#filterComponent = new FilterFormView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange,
      filterElementsCounts: filterElementsCounts
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
