const initialState = [];

export default function groups(state = initialState, action) {
    if (action.type === 'FETCH_GROUPS'){
        return action.payload;
    }
    return state;
}

