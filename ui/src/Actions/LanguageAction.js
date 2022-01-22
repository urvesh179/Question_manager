import * as ActionNames from '../ActionNames';
import axios from '../axios';

export const addLanguage = async (languageDispatch, language) => {
    const token = localStorage.getItem("token");
    await axios.post('/language/addLanguage', language, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            languageDispatch({
                type: ActionNames.ADD_LANGUAGE,
                data: {
                    language: response.data
                }
            });
           
        }).catch(error => {
            languageDispatch({
                type: ActionNames.ADD_LANGUAGE_FAILED,
                data: {
                    error: "Something Went Wrong"
                }
            });
           
        })
};


export const getAllLanguage = async (languageDispatch) => {
    await axios.get('/language/getAllLanguage')
        .then(async (response) => {
            languageDispatch({
                type: ActionNames.LANGUAGE_LIST,
                data: {
                    languages: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const removeLanguage = async (languageDispatch, id) => {
    const token = localStorage.getItem("token");
    await axios.delete('/language/deleteLanguage/' + id, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            languageDispatch({
                type: ActionNames.REMOVE_LANGUAGE,
                data: {
                    language: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const getLangaugeById = async (languageDispatch,id) => {
    await axios.get('/language/getLanguageById/'+id)
        .then(async (response) => {
            languageDispatch({
                type: ActionNames.GET_LANGUAGE,
                data: {
                    language: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const updateLanguage = async (languageDispatch, id ,language) => {
    const token = localStorage.getItem("token");
    await axios.put('/language/editLanguage/' + id, language,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            languageDispatch({
                type: ActionNames.UPDATE_LANGUAGE,
                data: {
                    language: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};
