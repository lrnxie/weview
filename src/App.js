import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Results from "./components/search/Results";
import Details from "./components/details/Details";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search/:query" component={Results} />
        <Route exact path="/:type/:id" component={Details} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
