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
import ScrollList from "ScrollList";
import ls from "local-storage";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

function App() {
  const [genres, setGenres] = useState([]);
  const [discoverMovie, setDiscoverMovie] = useState([]);
  // @ts-ignore
  const fav = ls.get("mylist") ?? [];
  const [myListMovie, setMyListMovie] = useState(fav);
  const [style, setStyle] = useState({ display: "none" });

  useEffect(() => {
    customFunc.fetchGenreList().then((d) => {
      setGenres(d);
    });
    customFunc.fetchDiscoverMovie().then((d) => {
      setDiscoverMovie(d);
    });
  }, [myListMovie]);

  const deleteGenre = (imageUrl) => {
    const newList = myListMovie.filter((val, _) => {
      return val != imageUrl;
    });
    // @ts-ignore
    ls.set("mylist", newList);
    setMyListMovie(newList);
    console.log("list has been updated");
  };

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

  let mylist;
  if (myListMovie.length > 0) {
    mylist = (
      <div className="flex-scroll">
        {myListMovie.map((image) => {
          return (
            <div
              className="align-center"
              onMouseEnter={(e) => {
                setStyle({ display: "block" });
              }}
              onMouseLeave={(e) => {
                setStyle({ display: "none" });
              }}
            >
              <img key={image} className="imglist" src={image} />
              <img
                style={style}
                className="delete-icon"
                src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-coloricon-1/21/52-512.png"
                onClick={() => deleteGenre(image)}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    mylist = (
      <div>
        <img src={emptyImg} className="empty-img" alt="No Image" />
        <h4 className="align-center">No movies were marked.</h4>
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
        <h1>My List</h1>
        {mylist}
        {genresList}
      </div>
    </>
  );
}

export default App;
