const initialState = null;

export default function news(state = initialState, action) {
    if (action.type === 'FETCH_NEWS'){
        return action.payload;
    }
    return state;
}

