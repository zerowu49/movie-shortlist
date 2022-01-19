import MylistContext from "mylist-context";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import emptyImg from "./images/empty.png";

function MyList() {
  const { myListMovie, deleteGenre } = useContext(MylistContext);
  const [style, setStyle] = useState({ display: "none" });

  let mylistlayout;
  if (myListMovie.length > 0) {
    mylistlayout = (
      <div className="flex-scroll">
        {myListMovie.map((image) => {
          return (
            <div
              className="align-center"
              onMouseEnter={(_) => {
                setStyle({ display: "block" });
              }}
              onMouseLeave={(_) => {
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
    mylistlayout = (
      <div>
        <img src={emptyImg} className="empty-img" alt="No Image" />
        <h4 className="align-center">No movies were marked.</h4>
      </div>
    );
  }

  return (
    <>
      <h1>My List</h1>
      {mylistlayout}
    </>
  );
}

export default MyList;
