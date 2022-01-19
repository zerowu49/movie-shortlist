import React from "react";
import ls from "local-storage";
import { useState } from "react";
import MylistContext from "mylist-context";

const MylistContextProvider = (props) => {
  // @ts-ignore
  const fav = ls.get("mylist") ?? [];
  const [myListMovie, setMyListMovie] = useState(fav);

  const deleteGenre = (imageUrl) => {
    const newList = myListMovie.filter((val, _) => {
      return val != imageUrl;
    });
    // @ts-ignore
    ls.set("mylist", newList);
    setMyListMovie(newList);
    console.log(imageUrl + "has been deleted from list");
  };

  const addGenre = (imageUrl) => {
    if (!myListMovie.includes(imageUrl)) myListMovie.push(imageUrl);
    const newList = [...myListMovie];
    // @ts-ignore
    ls.set("mylist", newList);
    setMyListMovie(newList);
    console.log(imageUrl + "has been added to list");
  };

  return (
    <MylistContext.Provider
      value={{
        myListMovie,
        addGenre,
        deleteGenre,
      }}
    >
      {props.children}
    </MylistContext.Provider>
  );
};

export default MylistContextProvider;
