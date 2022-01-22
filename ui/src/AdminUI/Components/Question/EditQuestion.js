import React, {useEffect, useState } from 'react'
import { withRouter } from 'react-router';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import * as lactions from '../../../Actions/LanguageAction';
import * as actions from '../../../Actions/QuestionAction';

import { useLanguageDispatch, useLanguageState } from '../../../Context/LanguageContext';
import { useQuestionDispatch, useQuestionState } from '../../../Context/QuestionContext';


function EditQuestion(props) {

    var { languages } = useLanguageState();
    var languageDispatch = useLanguageDispatch();

    var { error, question } = useQuestionState();
    var questionDispatch = useQuestionDispatch();

    var [language, setLanguage] = useState([]);
    var [que, setQue] = useState("");
    var [validation, setValidation] = useState("");
    var [id, setId] = useState(props.match.params.id);

    useEffect(async () => {
        await actions.getQuestionById(questionDispatch, id);
    }, [])

    useEffect(async () => {
        if (question != null) {
            setQue(question.question)
            setLanguage(question.languageId)
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

    const editquestion = async (event) => {
        event.preventDefault();
        if (await validate()) {
            const data = {
                languageId: language,
                question: que
            }
            await actions.updateQuestion(questionDispatch, id, data);
            props.history.push('/admin/questionlist')
            window.location="/admin/questionlist"
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
                                <h4><span class="font-weight-semibold">Edit Question </span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i>Dashboard</a>
                                    <a href="#" class="breadcrumb-item">Edit Question</a>

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
                                        <form onSubmit={editquestion} onReset={reset}>
                                            <input type="hidden" name="id" value={id} />


                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Languages <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <select id="language" name="language" multiple class="form-control" required="" size="2"
                                                        onChange={onChangeLanguage} value={language}
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
                                                </div>
                                            </div>

                                            <div class="form-group row mb-0">
                                                <div class="col-lg-10 ml-lg-auto">
                                                    <button type="reset" style={{ borderColor: "#26a69a" }} class="btn btn-light"
                                                    >Reset<i class="icon-reset ml-2"></i></button>
                                                    <button type="submit" class="btn bg-teal-400 ml-3">Edit <i class="icon-paperplane ml-2"></i></button>
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

export default EditQuestion;