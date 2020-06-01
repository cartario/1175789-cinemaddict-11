import FiltersComponent from "../components/mainNavigation.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {FilterType} from "../utils/const.js";
import {getMoviesByFilter} from "../utils/common.js";

export default class Filter {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    // пдписывается на метод модели
    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    // debugger;
    const allMovies = this._moviesModel.getAllMovies();
    const filters = Object.values(FilterType).map((filterType) => {

      return {
        name: filterType,
        count: getMoviesByFilter(allMovies, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldComponent = this._filterComponent;
    this._filterComponent = new FiltersComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._moviesModel.setFilterType(filterType);

  }

  _onDataChange() {
    this.render();
  }
}
