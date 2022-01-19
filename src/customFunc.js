const { default: axios } = require("axios");

const token = "9be5962f75cabd26c04eb4443674e0d2";
const urlGenreList = "https://api.themoviedb.org/3/genre/movie/list";
const urlDiscoverMovie = "https://api.themoviedb.org/3/discover/movie";
const urlGenreById = "https://api.themoviedb.org/3/list/";
export const baseImageUrl = "https://image.tmdb.org/t/p/original";
export const baseImageUrlW200 = "https://image.tmdb.org/t/p/w200";

async function fetchGenreList() {
  return await axios
    .get(urlGenreList + "?api_key=" + token)
    .then((val) => {
      return val.data["genres"];
    })
    .catch((err) => {
      console.log("error: " + err);
      return [];
    });
}

async function fetchOneGenreWithId(id) {
  return await axios
    .get(urlGenreById + id + "?api_key=" + token)
    .then((val) => {
      return val.data["items"];
    })
    .catch((err) => {
      console.log("error: " + err);
      return [];
    });
}

async function fetchDiscoverMovie() {
  return await axios
    .get(urlDiscoverMovie + "?api_key=" + token)
    .then((val) => {
      return val.data["results"];
    })
    .catch((err) => {
      console.log("error: " + err);
      return [];
    });
}

export default { fetchGenreList, fetchDiscoverMovie, fetchOneGenreWithId };
