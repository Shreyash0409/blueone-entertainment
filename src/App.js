import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import SimpleBottomNavigation from "./components/BottomNavigation/bottomNavigation.jsx";
import Header from "./components/Header/Header.jsx";
import Movies from "./Pages/Movies/Movies.jsx";
import Search from "./Pages/Search/Search.jsx";
import Series from "./Pages/Series/Series.jsx";
import Trending from "./Pages/Trending/Trending.jsx";
import VideoPlayer from "./Pages/VideoPlayer/VideoPlayer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/shows/movie" component={Movies} />
            <Route path="/shows/tv" component={Series} />
            <Route path="/shows/search" component={Search} />
            <Route path="/shows/watch" component={VideoPlayer} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
