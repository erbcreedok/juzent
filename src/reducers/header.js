const initialState = {
    style: 'DEFAULT',
    opacity: 'DEFAULT'
};

export default function header(state = initialState, action) {
    if (action.type === 'SET_STYLE'){
        state.style = action.payload;
        return state;
    }
    if (action.type === 'SET_OPACITY'){
        state.opacity = action.payload;
    }
    return state;
}

