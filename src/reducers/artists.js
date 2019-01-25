const initialState = {
    group: null,
    artists: null,
    selectedArtist: null
};

export default function artists(state = initialState, action) {
    if (action.type === 'FETCH_ARTISTS_ARTISTS'){
        return {...state, artists: action.payload};
    }
    if (action.type === 'FETCH_ARTISTS_GROUP'){
        return {...state, group: action.payload};
    }
    if (action.type === 'FETCH_ARTISTS_ARTIST'){
        return {...state, selectedArtist: action.payload}
    }
    if (action.type === 'FETCH_ARTISTS'){
        return action.payload;
    }
    if (action.type === 'CLEAR_ARTISTS') {
        return {...state, artists: null, selectedArtist: null}
    }

    return state;
}

