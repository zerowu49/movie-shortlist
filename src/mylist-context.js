import React from "react";

const MylistContext = React.createContext({
  myListMovie: [],
  addGenre: (imageUrl) => {},
  deleteGenre: (imageUrl) => {},
});

export default MylistContext;
