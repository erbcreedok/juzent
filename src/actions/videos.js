import { fs } from '../static/firebase-data';

export const getMainVideos = () => dispatch => {
    dispatch({ type: 'FETCH_VIDEOS', payload: 'LOADING' });
    fs.collection('videos').doc('top').get()
        .then((doc) => {
            if (doc.exists) {
                dispatch({type:'FETCH_VIDEOS', payload: doc.data().videos});
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getAllVideos = () => dispatch => {
    dispatch({ type: 'FETCH_VIDEOS', payload: 'LOADING' });
    fs.collection('videos').doc('videos').get()
        .then((doc) => {
            if (doc.exists) {
                dispatch({type:'FETCH_VIDEOS', payload: doc.data().videos});
            }
        })
        .catch(error => {
            console.log(error);
        });
};