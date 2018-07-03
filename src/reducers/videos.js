const initialState = null;

export default function videos(state = initialState, action) {
    if (action.type === 'FETCH_VIDEOS'){
        return action.payload;
    }
    return state;
}