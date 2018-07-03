import { fs } from '../static/firebase-data';

export const getGroups = (lang) => dispatch => {
    fs.collection('groups').doc(lang).get()
        .then((doc) => {
            if (doc.exists) {
                dispatch({type:'FETCH_GROUPS', payload: doc.data().groups});
            }
        })
        .catch(error => {
            console.log(error);
        });
};