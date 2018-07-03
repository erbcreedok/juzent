import { fs } from '../static/firebase-data';

export const getArtists = (id, lang) => dispatch => {
    dispatch({ type: 'FETCH_ARTISTS_GROUP', payload: 'LOADING' });
    dispatch({ type: 'FETCH_ARTISTS_ARTISTS', payload: 'LOADING' });
    fs.collection('group_artists').doc('' + id).collection('locale').doc(lang).get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                dispatch({type:'FETCH_ARTISTS_GROUP', payload: data.group});
                dispatch({type:'FETCH_ARTISTS_ARTISTS', payload: data.artists});
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getArtist = (id, lang) => dispatch => {
    if (!id) return;
    dispatch({ type: 'FETCH_ARTISTS_ARTIST', payload: 'LOADING' });
    fs.collection('artists').doc('' + id).collection('locale').doc(lang).get()
        .then((doc) => {
            if (doc.exists) {
                dispatch({type:'FETCH_ARTISTS_ARTIST', payload: doc.data()});
            }
        })
        .catch(error => {
            console.log(error);
        });
};