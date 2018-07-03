import { fs } from '../static/firebase-data';

export const getAlbums = () => dispatch => {
    dispatch({ type: 'FETCH_ALBUMS', payload: 'LOADING' });
    fs.collection('albums').doc('albums').get()
        .then((doc) => {
            if (doc.exists) {
                dispatch({type:'FETCH_ALBUMS', payload: doc.data().albums});
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getAlbum = (id) => dispatch => {
    dispatch({ type: 'FETCH_TRACKS_TRACKS', payload: 'LOADING' });
    dispatch({ type: 'FETCH_TRACKS_ALBUM', payload: 'LOADING' });
    fs.collection('songs').doc('' + id).get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                dispatch({type:'FETCH_TRACKS_ALBUM', payload: data.album});
                dispatch({type:'FETCH_TRACKS_TRACKS', payload: data.songs});
            }
        })
        .catch(error => {
            console.log(error);
        });
};