const initialState = [];

export default function concerts(state = initialState, action) {
    if (action.type === 'FETCH_CONCERTS'){
        return action.payload;
    }
    return state;
}

