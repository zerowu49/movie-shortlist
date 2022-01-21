import React, { createContext } from "react";

const MylistContext = createContext({
  myListMovie: [],
  addGenre: (imageUrl) => {},
  deleteGenre: (imageUrl) => {},
});

export default MylistContext;
