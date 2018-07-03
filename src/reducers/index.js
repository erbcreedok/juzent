import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import header from './header';
import tracks from './tracks';
import playlist from './playlist';
import groups from "./groups";
import artists from "./artists";
import news from "./news";
import concerts from "./concerts";
import article from "./article";
import projects from "./projects";
import albums from "./albums";
import playerNow from "./playerNow";
import languages from "./languages";
import videos from "./videos";
import release from "./release";

export default combineReducers({
    routing: routerReducer,
    header,
    tracks,
    albums,
    playlist,
    playerNow,
    groups,
    artists,
    news,
    concerts,
    article,
    projects,
    languages,
    videos,
    release
});

