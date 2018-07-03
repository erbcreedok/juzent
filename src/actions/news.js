import { fs } from '../static/firebase-data';


export const getMainNews = (lang) => dispatch => {
    dispatch({ type: 'FETCH_NEWS', payload: 'LOADING' });
    fs.collection('mainNews').doc(lang).get()
        .then((doc) => {
            if (doc.exists) {
                dispatch({type:'FETCH_NEWS', payload: doc.data().articles});
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getAllNews = (lang) => dispatch => {
    dispatch({ type: 'FETCH_NEWS', payload: 'LOADING' });
    fs.collection('news').doc(lang).get()
        .then((doc) => {
            if (doc.exists) {
                dispatch({type:'FETCH_NEWS', payload: doc.data().articles});
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getNewsArticle = (id, lang) => dispatch => {
    dispatch({type: 'FETCH_ARTICLE', payload: 'LOADING'});
    fs.collection('articles').doc('' + id).collection('locale').doc(lang).get()
        .then((doc) => {
            console.log(doc);
            if (doc.exists) {
                let article = doc.data();
                article.article_created = new Date(article.article_created);
                dispatch({type:'FETCH_ARTICLE', payload: article});
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getMainProjects = (lang) => dispatch => {
    dispatch({ type: 'FETCH_PROJECTS', payload: 'LOADING' });
    fs.collection('mainProjects').doc(lang).get()
        .then((doc) => {
            if (doc.exists) {
                dispatch({type:'FETCH_PROJECTS', payload: doc.data().articles})
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getAllProjects = (lang) => dispatch => {
    dispatch({ type: 'FETCH_PROJECTS', payload: 'LOADING' });
    fs.collection('projects').doc(lang).get()
        .then((doc) => {
            if (doc.exists) {
                dispatch({type:'FETCH_PROJECTS', payload: doc.data().articles});
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const getProjectArticle = (id, lang) => dispatch => {
    dispatch({type: 'FETCH_ARTICLE', payload: 'LOADING'});
    fs.collection('articles').doc('' + id).collection('locale').doc(lang).get()
        .then((doc) => {
            console.log(doc);
            if (doc.exists) {
                let article = doc.data();
                article.article_created = new Date(article.article_created);
                dispatch({type:'FETCH_ARTICLE', payload: article});
            }
        })
        .catch(error => {
            console.log(error);
        });

};

export const getNewRelease = () => dispatch => {
    dispatch({ type: 'FETCH_RELEASE', payload: 'LOADING' });
    fs.collection('release').doc('release').get()
        .then((doc) => {
            if (doc.exists) {
                let release = doc.data();
                release.release_date = new Date(release.release_date);
                dispatch({type:'FETCH_RELEASE', payload: release})
            }
        })
        .catch(error => {
            console.log(error);
        });
};