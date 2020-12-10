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

