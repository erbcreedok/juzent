import { fs } from '../static/firebase-data';

export const getTopConcerts = (lang) => dispatch => {
    dispatch({ type: 'FETCH_CONCERTS', payload: 'LOADING' });
    fs.collection('concerts').doc(lang).get()
        .then((doc) => {
            if (doc.exists) {
                let concerts = doc.data().concerts;
                concerts.map((concert) => {
                    const timeZoneOffset = new Date(0).getHours() - new Date(0).getUTCHours();
                    concert.concert_time = new Date(new Date(concert.concert_time + 'Z') - (timeZoneOffset * 3600000));
                    return concert;
                });
                dispatch({type:'FETCH_CONCERTS', payload: concerts});
            }
        })
        .catch(error => {
            console.log(error);
        });
};