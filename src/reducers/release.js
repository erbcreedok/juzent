const initialState = null;

export default function release(state = initialState, action) {
    if (action.type === 'FETCH_RELEASE'){
        return action.payload;
    }
    return state;
}

