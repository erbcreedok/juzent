const initialState = null;

export default function playlist(state = initialState, action) {
    if (action.type === 'ADD_PLAYLIST'){
        return [
            ...state,
            action.payload
        ]
    }
    return state;
}