import * as ActionNames from '../ActionNames';
import axios from '../axios';

export const addQuestion = async (questionDispatch, question) => {
    const token = localStorage.getItem("token");
    await axios.post('/question/add', question, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            questionDispatch({
                type: ActionNames.ADD_QUESTION,
                data: {
                    question: response.data
                }
            });
        }).catch(error => {
            questionDispatch({
                type: ActionNames.ADD_QUESTION_FAILED,
                data: {
                    error: "Something Went Wrong"
                }
            });
        })
};


export const getAllQuestion = async (questionDispatch) => {
    await axios.get('/question/getAll')
        .then(async (response) => {
            questionDispatch({
                type: ActionNames.QUESTION_LIST,
                data: {
                    questions: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const removeQuestion = async (questionDispatch, id) => {
    const token = localStorage.getItem("token");
    await axios.delete('/question/delete/' + id, {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            questionDispatch({
                type: ActionNames.REMOVE_QUESTION,
                data: {
                    question: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const getQuestionById = async (questionDispatch,id) => {
    await axios.get('/question/getById/'+id)
        .then(async (response) => {
            questionDispatch({
                type: ActionNames.GET_QUESTION,
                data: {
                    question: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const updateQuestion = async (questionDispatch, id ,question) => {
    const token = localStorage.getItem("token");
    await axios.put('/question/edit/' + id, question,{
        headers: {
            authorization: 'Bearer ' + token
        }
    })
        .then(async (response) => {
            questionDispatch({
                type: ActionNames.UPDATE_QUESTION,
                data: {
                    question: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};

export const getSearchQuestion = async (questionDispatch,data) => {
   // console.log(data)
    await axios.post('/question/getQuestions',data)
        .then(async (response) => {
            questionDispatch({
                type: ActionNames.QUESTION_LIST,
                data: {
                    questions: response.data
                }
            });
        }).catch(error => {
            throw new Error(error);
        })
};
