import "./App.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import SwiperCore, { Autoplay, Navigation } from "swiper";
import { useContext, useEffect, useState } from "react";
import customFunc, { baseImageUrl } from "./data/apiHandler";
import React from "react";
import ScrollList from "ScrollList";
import MylistContext from "context/mylist-context";
import MyList from "MyList";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

function App() {
  const mylistContext = useContext(MylistContext);
  const [genres, setGenres] = useState([]);
  const [discoverMovie, setDiscoverMovie] = useState([]);

  useEffect(() => {
    Promise.all([
      customFunc.fetchGenreList(),
      customFunc.fetchDiscoverMovie(),
    ]).then((val) => {
      setGenres(val[0]);
      setDiscoverMovie(val[1]);
    });
  }, []);

  const listImage = discoverMovie.map((d) => {
    return { img: baseImageUrl + d["backdrop_path"], title: d["title"] };
  });

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

  let genresList;

  if (genres.length > 0) {
    genresList = genres.map((genre) => {
      return (
        <div key={genre.id}>
          <h1>{genre.name}</h1>
          <ScrollList id={genre.id} />
        </div>
      );
    });
  }

  return (
    <>
      <Swiper loop={true} className="swiper" autoplay={true}>
        {header}
      </Swiper>
      <div className="padding">
        <MyList />
        {genresList}
      </div>
    </>
  );
}

export default App;
