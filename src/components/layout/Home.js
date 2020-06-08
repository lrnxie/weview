import React, { Fragment } from "react";

import Search from "../search/Search";
import Trending from "../trending/Trending";

const Home = () => {
  return (
    <Fragment>
      <Search />
      <Trending type="movie" />
      <Trending type="tv" />
    </Fragment>
  );
};

export default Home;
