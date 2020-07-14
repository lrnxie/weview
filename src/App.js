import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { RatingContextProvider } from "./contexts/RatingContext";

import Navbar from "./components/layout/Navbar";
import AlertToast from "./components/layout/AlertToast";
import Home from "./components/layout/Home";
import Results from "./components/search/Results";
import Details from "./components/details/Details";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import PrivateRoute from "./components/layout/PrivateRoute";
import AccountSettings from "./components/user/AccountSettings";
import MyRatings from "./components/user/MyRatings";

function App() {
  return (
    <AuthContextProvider>
      <RatingContextProvider>
        <BrowserRouter>
          <Navbar />
          <AlertToast />
          <Switch>
            <PrivateRoute exact path="/settings" component={AccountSettings} />
            <PrivateRoute exact path="/ratings" component={MyRatings} />
            <Route exact path="/" component={Home} />
            <Route exact path="/search/:query" component={Results} />
            <Route exact path="/:type/:id" component={Details} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Redirect from="*" to="/" />
          </Switch>
        </BrowserRouter>
      </RatingContextProvider>
    </AuthContextProvider>
  );
}

export default App;
