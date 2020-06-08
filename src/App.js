import React from "react";
import Navbar from "./components/layout/Navbar";
import Trending from "./components/trending/Trending";

function App() {
  return (
    <div>
      <Navbar />
      <Trending type="movie" />
      <Trending type="tv" />
    </div>
  );
}

export default App;
