import React, { Component } from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/headerComponent/header';
import Footer from "./components/footerComponent/footer";
import Main from "./pages/mainPage/main";
import Concerts from "./pages/concertsPage/concerts";
import Artists from "./pages/artistsPage/artists";
import Songs from "./pages/songsPage/songs";
import Contacts from "./pages/contactsPage/contacts";
import AudioGlobal from "./components/audioGlobalComponent/audioGlobal";
import AllSongs from "./pages/allSongsPage/allSongs";
import AllAlbums from "./pages/allAlbumsPage/allAlbums";
import AllVideos from "./pages/allVideosPage/allVideos";
import AllNews from "./pages/allNewsPage/allNews";
import Article from "./pages/articlePage/article";
import AllArtists from "./pages/allArtistsPage/allArtists";
import AllProjects from "./pages/allProjectsPage/allProjects";

class App extends Component {
  componentWillMount() {
      if (!localStorage.getItem('juz-locale')) {
          localStorage.setItem('juz-locale', 'ru');
      }
      const lang = localStorage.getItem('juz-locale');
      this.props.setLanguage(lang);
  }

  render() {
    return (
      <div className="App">
          <Header />
          <AudioGlobal />
          <Switch>
              <Route exact path="/" component={Main}/>
              <Route path="/artists" exact component={AllArtists}/>
              <Route path="/artists/:id/:artistId" component={Artists}/>
              <Route path="/artists/:id" component={Artists}/>
              <Route path="/songs/:albumId" component={Songs}/>
              <Route path="/songs" component={Songs}/>
              <Route path="/contacts" component={Contacts}/>
              <Route path="/allSongs" component={AllSongs}/>
              <Route path="/allAlbums" component={AllAlbums}/>
              <Route path="/allVideos" component={AllVideos}/>
              <Route path="/allProjects" component={AllProjects}/>
              <Route path="/allNews" component={AllNews}/>
              <Route path="/article/:type/:id" component={Article}/>
              <Redirect from="/article" to="/allNews"/>
          </Switch>
          <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(
    state => ({}),
    dispatch => ({
        setLanguage: (lang) => {
            dispatch({type: 'SET_LANGUAGE', payload: lang});
        }
    })
)(App));
