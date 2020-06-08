import React from "react";
import Navbar from "./components/layout/Navbar";
import Trending from "./components/trending/Trending";
import Search from "./components/search/Search";

function App() {
  return (
    <div>
      <Navbar />
      <Search />
      <Trending type="movie" />
      <Trending type="tv" />
    </div>
  );
}

export default App;
