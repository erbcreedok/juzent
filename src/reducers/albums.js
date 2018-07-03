const initialState = null;

export default function albums(state = initialState, action) {
    if (action.type === 'FETCH_ALBUMS'){
        return action.payload;
    }
    return state;
}