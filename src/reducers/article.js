const initialState = null;

export default function article(state = initialState, action) {
    if (action.type === 'FETCH_ARTICLE'){
        return action.payload;
    }
    return state;
}

