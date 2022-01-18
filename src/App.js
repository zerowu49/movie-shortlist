import "./App.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import emptyImg from "./images/empty.png";

import SwiperCore, { Autoplay, Navigation } from "swiper";
import { useEffect, useState } from "react";
import customFunc, { baseImageUrl } from "./customFunc";
import React from "react";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

function App() {
  const [genres, setGenres] = useState([]);
  const [listGenres, setListGenres] = useState([]);
  const [discoverMovie, setDiscoverMovie] = useState([]);

  useEffect(() => {
    customFunc.fetchGenreList().then((d) => {
      setGenres(d);
    });
    customFunc.fetchDiscoverMovie().then((d) => {
      setDiscoverMovie(d);
    });
  }, []);

  const listImage = discoverMovie.map((d) => {
    return { img: baseImageUrl + d["backdrop_path"], title: d["title"] };
  });

  const myImage = [
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg",
    "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055__340.jpg",
    "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg",
  ];

  let header;
  if (listImage.length > 0) {
    header = listImage.map((image) => {
      return (
        <SwiperSlide>
          <img className="App-logo" src={image.img} alt="Image" />
          <figcaption className="align-center">{image.title}</figcaption>
        </SwiperSlide>
      );
    });
  } else {
    header = (
      <div>
        <img
          src="https://icon-library.com/images/movie-icon-png/movie-icon-png-2.jpg"
          className="empty-img"
          alt="No Image"
        />
      </div>
    );
  }

  let mylist;
  if (myImage.length > 0) {
    mylist = (
      <div className="flex-scroll">
        {myImage.map((image) => {
          return <img className="imglist" src={image} />;
        })}
      </div>
    );
  } else {
    mylist = (
      <div>
        <img src={emptyImg} className="empty-img" alt="No Image" />
        <h4 className="align-center">No image in here.</h4>
      </div>
    );
  }

  let genresList;

  if (genres.length > 0) {
    genresList = genres.map((genre) => {
      // console.log(listGenres);
      console.log(genre["id"]);

      return (
        <>
          <h1>{genre.name}</h1>
          <div className="flex-scroll">
            {listGenres.map((image) => {
              return (
                <img
                  className="imglist"
                  src={baseImageUrl + image["backdrop_path"]}
                />
              );
            })}
          </div>
        </>
      );
    });
  }

  return (
    <>
      <Swiper loop={true} className="swiper" autoplay={true}>
        {header}
      </Swiper>
      <div className="padding">
        <h1>My List</h1>
        {mylist}
        {genresList}
      </div>
    </>
  );
}

export default App;
