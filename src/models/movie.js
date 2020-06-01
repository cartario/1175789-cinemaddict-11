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


// filmInfo Структура:
// actors: (6) ["Takeshi Kitano", "Christian Bale", "Gary Oldman", "Harrison Ford", "Cillian Murphy", "Ralph Fiennes"]
// age_rating: 6
// alternative_title: "A Shark Who Saw Himself"
// description: "true masterpiece where love and death are closer to heroes than their family."
// director: "Clint Eastwood"
// genre: []
// poster: "images/posters/the-great-flamarion.jpg"
// release: {date: "2004-04-15T02:19:53.175Z", release_country: "USA"}
// runtime: 162
// title: "A Tale Of A Little Bird Who Sold Themselves"
// total_rating: 4
// writers: (3) ["Robert Zemeckis", "Robert Rodrigues", "Hayao Miazaki"]

// user_details Структура:
// already_watched: true
// favorite: false
// watching_date: "2020-02-24T13:34:21.386Z"
// watchlist: false

// comments: []

// id: "0"
