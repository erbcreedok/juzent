const initialState = {
    song: null,
    state: {
        playing: false,
        currentTime: 0,
        duration: 1,
    }
};

export default function playerNow(state = initialState, action) {
    if (action.type === 'PLAYER_NOW_SET_TRACK') {
        return {...state, song: action.payload};
    }
    if (action.type === 'PLAYER_NOW_PLAY_TRACK') {
        return {...state, song: action.payload, state: {...state.state, playing: true}};
    }
    if (action.type === 'PLAYER_NOW_PLAY') {
        console.log(action);
        return {...state, state: {...state.state, playing: action.payload}}
    }
    if (action.type === 'PLAYER_NOW_SET_CURRENT_TIME') {
        return {...state, state: {...state.state, currentTime: action.payload}}
    }
    if (action.type === 'PLAYER_NOW_SET_DURATION') {
        return {...state, state: {...state.state, duration: action.payload}}
    }
    return state;
}