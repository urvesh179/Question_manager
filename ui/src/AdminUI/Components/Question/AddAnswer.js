import React, { useEffect, useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import * as actions from '../../../Actions/QuestionAction';
import * as aactions from '../../../Actions/AnswerAction';

import { useQuestionDispatch, useQuestionState } from '../../../Context/QuestionContext';
import { useAnswerDispatch, useAnswerState } from '../../../Context/AnswerContext';

function AddAnswer(props) {

    var { error, question } = useQuestionState();
    var questionDispatch = useQuestionDispatch();

    var { error, answer } = useAnswerState();
    var answerDispatch = useAnswerDispatch();

    var [que, setQue] = useState("");
    var [ans, setAns] = useState([]);
    var [validation, setValidation] = useState("");
    var [id, setId] = useState(props.match.params.id);

    useEffect(async () => {
        await actions.getQuestionById(questionDispatch, id);
    }, [])

    useEffect(async () => {
        if (question != null) {
            setQue(question.question)
        }
    }, [question])

    const renderAnswer = (ans, handleChange, deleteAnswer) => {
        return ans.map(detail => (
            <div key={detail.key} >

                <div class="form-group row">
                    <label class="col-form-label col-lg-2">Answer <span class="text-danger">*</span></label>

                    <div class="col-lg-9">
                        <SunEditor
                            onChange={(val) => handleChange(detail.key, val)}
                            placeholder="Write Answer Here."
                            lang="en"
                            height="100"
                            setOptions={{
                                buttonList: [
                                    ["undo", "redo"],
                                    ["font", "fontSize", "formatBlock", "paragraphStyle", "blockquote", "bold", "underline", "italic", "strike", "subscript", "superscript",
                                        "fontColor", "textStyle"],
                                    ["removeFormat"],
                                    ["table", "list", "lineHeight"]
                                ]
                            }} />

                    </div>

                    <div>
                        <button class="btn bg-teal-400 ml-1" onClick={() => deleteAnswer(detail.key)}>X</button>
                    </div>
                </div>
            </div>
        ))
    }

    const addAnswer = () => {
        let newAns = [...ans];
        newAns.push({ key: ans.length, ans: "" });
        setAns(newAns);
    }

    const deleteAnswer = (key) => {
        let newAns = [...ans].filter(detail => detail.key !== key);
        setAns(newAns);
    }
    const handleDataChange = (key, value) => {
        let newAns = [...ans];
        newAns[key].ans = value;
        setAns(newAns);
    }

    useEffect(async () => {
        if (answer != null) {
            props.history.push("/admin/questionlist")
        }
    }, [error, answer])



    const reset = () => {
        setQue("");
        setValidation("");
        setAns("");
        error = "";
        question = "";
    }

    const sumbitHandler=async(event)=>{
        event.preventDefault();
    }

    const add = async (event) => { 
        if (await validate()) {
            ans.forEach(async (final) => {
                if (final.ans != "") {
                    const answerdata = {
                        questionId: question._id,
                        answer: final.ans
                    }
                    await aactions.addAnswer(answerDispatch, answerdata)
                }
            });
        }
    }

    const validate = () => {
        let err = {};
        let isValid = true;

        if (ans.length == 0) {
            isValid = false;
            err["answer"] = "Please add atleast one answer.";
        }

        setValidation(err)
        return isValid;
    }

    return (

        <>
            <Header />
            <div className="page-content" style={{ height: "100%" }} >
                <Sidebar />

                <div class="content-wrapper">

                    <div class="page-header page-header-light">
                        <div class="page-header-content header-elements-md-inline" style={{ height: "55px" }}>
                            <div class="page-title d-flex">
                                <h4><span class="font-weight-semibold">Add Answer </span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i>Dashboard</a>
                                    <a href="#" class="breadcrumb-item">Add Answer</a>
                                </div>

                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>
                    </div>

                    <div class="content">

                        <div class="row" style={{ marginBottom: "50px" }}>
                            <div class="col-md-12">

                                <div class="card">
                                    <div class="card-header header-elements-inline">

                                    </div>

                                    <div class="card-body">
                                        <form onSubmit={sumbitHandler} onReset={reset}>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Question <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" name="question" placeholder="Enter Question"
                                                        value={que} readOnly />
                                                    <div className="validation-invalid-label">{validation["answer"]}</div>
                                                </div>
                                            </div>

                                            {renderAnswer(ans, handleDataChange, deleteAnswer)}
                                            <div class="form-group row">
                                                <div class="card-header header-elements-inline" style={{ marginLeft: "140px" }}>
                                                    <h5 class="card-title"></h5>
                                                    <div class="header-elements">
                                                        <div class="list-icons">
                                                            <button onClick={addAnswer} class="btn bg-teal-400 ml-3" >Add Answer + </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group row mb-0">
                                                <div class="col-lg-10 ml-lg-auto">
                                                    <button type="reset" style={{ borderColor: "#26a69a" }} class="btn btn-light"
                                                    >Reset<i class="icon-reset ml-2"></i></button>
                                                    <button type="submit" onClick={add} class="btn bg-teal-400 ml-3">Add <i class="icon-paperplane ml-2"></i></button>
                                                    <div style={{ color: "red", fontSize: "18px", paddingTop: "5px" }}>{error}</div>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(AddAnswer);
