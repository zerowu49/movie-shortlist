import customFunc, { baseImageUrlW200 } from "data/apiHandler";
import MylistContext from "context/mylist-context";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import emptyImg from "./images/empty.png";

function ScrollList(genre) {
  const { addGenre } = useContext(MylistContext);
  const [listGenres, setListGenres] = useState([]);

  useEffect(() => {
    customFunc.fetchOneGenreWithId(genre.id).then((d) => {
      setListGenres(d);
    });
  }, []);

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
