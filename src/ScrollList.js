import customFunc, { baseImageUrlW200 } from "customFunc";
import React from "react";
import { useEffect, useState } from "react";
import emptyImg from "./images/empty.png";
import ls from "local-storage";

function ScrollList(genre) {
  const [listGenres, setListGenres] = useState([]);
  const [myListMovie, setMyListMovie] = useState([]);

  useEffect(() => {
    customFunc.fetchOneGenreWithId(genre.id).then((d) => {
      setListGenres(d);
    });

    // @ts-ignore
    const fav = ls.get("mylist");
    if (fav != null) setMyListMovie(fav);
  }, []);

  const addGenre = (imageUrl) => {
    myListMovie.push(imageUrl);
    // @ts-ignore
    ls.set("mylist", myListMovie);
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
        <div key={image["id"]} className="align-center">
          <img
            className={"imglist " + image["id"]}
            src={imagePath}
            onClick={() => addGenre(imagePath)}
          />
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
