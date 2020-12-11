import * as ActionNames from '../ActionNames';
import axios from '../axios';

export const addAnswer = async (answerDispatch, answer) => {
    const token = localStorage.getItem("token");
    await axios.post('/answer/add', answer, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            answerDispatch({
                type: ActionNames.ADD_ANSWER,
                data: {
                    answer: response.data
                }
            });
        }).catch(error => {
            answerDispatch({
                type: ActionNames.ADD_ANSWER_FAILED,
                data: {
                    error: "Something Went Wrong"
                }
            });
        })
};


export const getAllAnswerByQuestion = async (answerDispatch,id) => {
    await axios.get('/answer/getAllByQuestion/'+id)
        .then(async (response) => {
            answerDispatch({
                type: ActionNames.ANSWER_LIST,
                data: {
                    answers: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};


export const removeAnswer = async (answerDispatch, id) => {
    const token = localStorage.getItem("token");
    await axios.delete('/answer/delete/' + id, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            answerDispatch({
                type: ActionNames.REMOVE_ANSWER,
                data: {
                    answer: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const getAnswerById = async (answerDispatch,id) => {
    await axios.get('/answer/getById/'+id)
        .then(async (response) => {
            answerDispatch({
                type: ActionNames.GET_ANSWER,
                data: {
                    answer: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const updateAnswer = async (answerDispatch, id ,answer) => {
    const token = localStorage.getItem("token");
    await axios.put('/answer/edit/' + id, answer,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            answerDispatch({
                type: ActionNames.UPDATE_ANSWER,
                data: {
                    answer: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};
