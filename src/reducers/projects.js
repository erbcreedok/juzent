const initialState = null;

export default function projects(state = initialState, action) {
    if (action.type === 'FETCH_PROJECTS'){
        return action.payload;
    }
    return state;
}

