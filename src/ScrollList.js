import customFunc, { baseImageUrlW200 } from "customFunc";
import React from "react";
import { useEffect, useState } from "react";
import emptyImg from "./images/empty.png";
import ls from "local-storage";

function ScrollList(genre) {
  const [listGenres, setListGenres] = useState([]);
  // @ts-ignore
  const fav = ls.get("mylist") ?? [];
  const [myListMovie, setMyListMovie] = useState(fav);

  useEffect(() => {
    customFunc.fetchOneGenreWithId(genre.id).then((d) => {
      setListGenres(d);
    });
  }, [myListMovie]);

  const addGenre = (imageUrl) => {
    if (!myListMovie.includes(imageUrl)) myListMovie.push(imageUrl);
    // @ts-ignore
    ls.set("mylist", myListMovie);
    setMyListMovie(myListMovie);
    console.log("list has been updated");
  };

  let genresList;
  if (listGenres.length > 0) {
    genresList = listGenres.map((image) => {
      let imagePath;
      if (image["backdrop_path"] != null) {
        imagePath = baseImageUrlW200 + image["backdrop_path"];
      } else {
        imagePath = "https://via.placeholder.com/350x200";
      }
      return (
        <div
          key={image["id"]}
          className="align-center"
          onClick={() => addGenre(imagePath)}
        >
          <img className={"imglist " + image["id"]} src={imagePath} />
          <figcaption>{image["title"]}</figcaption>
        </div>
      );
    });
  } else {
    genresList = (
      <div>
        <img src={emptyImg} className="empty-img" alt="No Image" />
        <h4 className="align-center">No movies were listed here.</h4>
      </div>
    );
  }
  return <div className={"flex-scroll " + genre.id}>{genresList}</div>;
}

export default ScrollList;
