export const playerNowPlaySong = (song) => dispatch => {
    dispatch({type: 'PLAYER_NOW_PLAY_TRACK', payload: song});
};
export const playerNowSetSong = (song) => dispatch => {
    dispatch({type: 'PLAYER_NOW_SET_TRACK', payload: song});
};
export const playerNowPlay = () => dispatch => {
    dispatch({type: 'PLAYER_NOW_PLAY', payload: true});
};
export const playerNowPause = () => dispatch => {
    dispatch({type: 'PLAYER_NOW_PLAY', payload: false});
};
export const setCurrentTime = (time) => dispatch => {
    dispatch({type: 'PLAYER_NOW_SET_CURRENT_TIME', payload: time});
};
export const setDuration = (time) => dispatch => {
    dispatch({type: 'PLAYER_NOW_SET_DURATION', payload: time});
};