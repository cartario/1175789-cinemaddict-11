import moment from "moment";
import {FilterType} from "./const.js";

export const formatTime = (date) => {

  return moment(date).format(`hh:mm`);
};

export const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return movies;
    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);
    case FilterType.HISTORY:
      return getHistoryMovies(movies);
    case FilterType.FAVORITES:
      return getFavoriteMovies(movies);
  }

  return true;
};

const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.userDetails.watchlist);
};

const getHistoryMovies = (movies) => {
  return movies.filter((movie) => movie.userDetails.alreadyWatched);
};

const getFavoriteMovies = (movies) => {
  return movies.filter((movie) => movie.userDetails.favorite);
};
