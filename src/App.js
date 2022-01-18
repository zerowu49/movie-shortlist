import "./App.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import emptyImg from "./images/empty.png";

import SwiperCore, { Autoplay, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

function App() {
  const listImage = [
    "https://cdn.pixabay.com/photo/2018/01/18/19/06/time-3091031__340.jpg",
    "https://cdn.pixabay.com/photo/2017/09/30/22/16/rail-2803725__340.jpg",
  ];

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
          <img className="App-logo" src={image} alt="Image" />
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

  return (
    <>
      <Swiper loop={true} className="swiper" autoplay={true}>
        {header}
      </Swiper>
      <div className="padding">
        <h1>My List</h1>
        {mylist}
      </div>
    </>
  );
}

export default App;
