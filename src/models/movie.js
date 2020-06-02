export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.filmInfo = {};
    this.filmInfo.actors = data[`film_info`].actors;
    this.filmInfo.ageRating = data[`film_info`].age_rating;
    this.filmInfo.alternativeTitle = data[`film_info`].alternative_title;
    this.filmInfo.description = data[`film_info`].description;
    this.filmInfo.director = data[`film_info`].director;
    this.filmInfo.genre = data[`film_info`].genre;
    this.filmInfo.poster = data[`film_info`].poster;
    this.filmInfo.release = {};
    this.filmInfo.release.releaseDate = new Date(data[`film_info`].release.date);
    this.filmInfo.release.releaseCountry = data[`film_info`].release.release_country;
    this.filmInfo.runtime = data[`film_info`].runtime;
    this.filmInfo.title = data[`film_info`].title;
    this.filmInfo.totalRating = data[`film_info`].total_rating;
    this.filmInfo.writers = data[`film_info`].writers;
    this.userDetails = {};
    this.userDetails.alreadyWatched = data[`user_details`].already_watched;
    this.userDetails.watchingDate = new Date(data[`user_details`].watching_date);
    this.userDetails.watchlist = data[`user_details`].watchlist;
    this.userDetails.favorite = data[`user_details`].favorite;
    this.comments = data[`comments`];
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {

    return data.map(Movie.parseMovie);
  }
}
