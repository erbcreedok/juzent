const initialState = 'ru';

export default function languages(state = initialState, action) {
    if (action.type === 'SET_LANGUAGE'){
        localStorage.setItem('juz-locale', action.payload);
        return action.payload;
    }
    return state;
}

