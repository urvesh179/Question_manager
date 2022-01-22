import React, { useEffect, useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import * as lactions from '../../../Actions/LanguageAction';
import * as actions from '../../../Actions/QuestionAction';
import * as aactions from '../../../Actions/AnswerAction';

import { useLanguageDispatch, useLanguageState } from '../../../Context/LanguageContext';
import { useQuestionDispatch, useQuestionState } from '../../../Context/QuestionContext';
import { useAnswerDispatch, useAnswerState } from '../../../Context/AnswerContext';

function AddQuestion(props) {

    var { languages } = useLanguageState();
    var languageDispatch = useLanguageDispatch();

    var { error, question } = useQuestionState();
    var questionDispatch = useQuestionDispatch();

    var { error, answer } = useAnswerState();
    var answerDispatch = useAnswerDispatch();

    var [language, setLanguage] = useState([]);
    var [que, setQue] = useState("");
    var [ans, setAns] = useState([]);
    var [validation, setValidation] = useState("");

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
            window.location="/admin/questionlist"
        }
    }, [error, answer])

    useEffect(async () => {
        if (question != null) {
            ans.forEach(async (final) => {
                const answerdata = {
                    questionId: question._id,
                    answer: final.ans
                }
                await aactions.addAnswer(answerDispatch, answerdata)
            });
        }
    }, [question])

    useEffect(async () => {
        await lactions.getAllLanguage(languageDispatch);
    }, [])

    var lan = languages.map(l => {
        lan = (<option value={l._id}>{l.name}</option>)
        return lan;
    })

    const reset = () => {
        setLanguage("");
        setQue("");
        setValidation("");
        setAns("");
        error = "";
        question = "";
    }

    const onChangeLanguage = async (event) => {
        var selected = [];
        for (var option of document.getElementById('language').options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        setLanguage(selected)
    }

    const add = async (event) => {
        event.preventDefault();
    }

    const addquestion = async (event) => {
        event.preventDefault();
        if (await validate()) {
            const data = {
                languageId: language,
                question: que
            }
            await actions.addQuestion(questionDispatch, data);
           
        }
    }

    const validate = () => {
        let err = {};
        let isValid = true;

        if (language.length == 0) {
            isValid = false;
            err["language"] = "Please select atleast one language.";
        }

        if (!que) {
            isValid = false;
            err["question"] = "Please enter question.";
        }

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
                                <h4><span class="font-weight-semibold">Add Question </span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i>Dashboard</a>
                                    <a href="/admin/addquestion" class="breadcrumb-item">Add Question</a>
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
                                        <form onSubmit={add} onReset={reset}>
                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Languages <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <select id="language" name="language" multiple class="form-control" required="" size="2"
                                                        onChange={onChangeLanguage}
                                                    >
                                                        {lan}
                                                    </select>
                                                    <div className="validation-invalid-label">{validation["language"]}</div>
                                                </div>
                                            </div>

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Question <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" name="question" placeholder="Enter Question"
                                                        value={que} onChange={(e) => setQue(e.target.value)} />
                                                    <div className="validation-invalid-label">{validation["question"]}</div>
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
                                                    <button type="submit" onClick={addquestion} class="btn bg-teal-400 ml-3">Add <i class="icon-paperplane ml-2"></i></button>
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

export default withRouter(AddQuestion);
