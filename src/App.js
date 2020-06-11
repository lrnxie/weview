import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { RatingContextProvider } from "./contexts/RatingContext";

import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Results from "./components/search/Results";
import Details from "./components/details/Details";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";

function App() {
  return (
    <AuthContextProvider>
      <RatingContextProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search/:query" component={Results} />
            <Route exact path="/:type/:id" component={Details} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </BrowserRouter>
      </RatingContextProvider>
    </AuthContextProvider>
  );
}

export default App;
