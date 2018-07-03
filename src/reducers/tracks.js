const initialState = {
    tracks: null,
    album: null
};

export default function tracks(state = initialState, action) {
    if (action.type === 'ADD_TRACK'){
        return [
            ...state,
            action.payload
        ]
    }
    if (action.type === 'FETCH_TRACKS_TRACKS'){
        return {...state, tracks: action.payload};
    }
    if (action.type === 'FETCH_TRACKS_ALBUM') {
        return {...state, album: action.payload};
    }
    return state;
}