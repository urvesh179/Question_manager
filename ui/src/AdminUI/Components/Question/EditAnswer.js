import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import * as actions from '../../../Actions/AnswerAction';

import { useAnswerDispatch, useAnswerState } from '../../../Context/AnswerContext';
import { QuestionProvider } from '../../../Context/QuestionContext';

function EditAnswer(props) {

    var { error, answer } = useAnswerState();
    var answerDispatch = useAnswerDispatch();

    var [ans, setAns] = useState([]);
    var [validation, setValidation] = useState("");
    var [id, setId] = useState(props.match.params.id);

    useEffect(async () => {
        await actions.getAnswerById(answerDispatch, id);
    }, [])

    useEffect(async () => {
        if (answer != null) {
            setAns(answer.answer)
        }
    }, [answer])

    const handleChange = (value) => {
        setAns(value);
    }

    const reset = () => {
        setAns("");
        setValidation("");
        error = "";
        answer = "";
    }

    const editanswer = async (event) => {
        event.preventDefault();
        if (await validate()) {
            const data = {
                answer: ans
            }
            await actions.updateAnswer(answerDispatch, id, data);
            props.history.push('/admin/answerlist/'+answer.questionId)
            window.location=`/admin/answerlist/${answer.questionId}`
        }
    }

    const validate = () => {
        let err = {};
        let isValid = true;

        if (!answer) {
            isValid = false;
            err["answer"] = "Please enter answer.";
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
                                <h4><span class="font-weight-semibold">Edit Answer </span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i>Dashboard</a>
                                    <a href="#" class="breadcrumb-item">Edit Answer</a>

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
                                        <form onSubmit={editanswer} onReset={reset}>
                                            <input type="hidden" name="id" value={id} />

                                            <div class="form-group row">
                                                <label class="col-form-label col-lg-2">Answer <span class="text-danger">*</span></label>
                                                <div class="col-lg-9">
                                                    <SunEditor
                                                        setContents={ans}
                                                        onChange={(val) =>setAns(val)}
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
                                                    {/* <textarea
                                                        value={ans}
                                                        onChange={(e) => setAns(e.target.value)}
                                                        placeholder="Write Answer Here."
                                                        rows = "5"    
                                                    >

                                                    </textarea> */}
                                                    <div className="validation-invalid-label">{validation["answer"]}</div>
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

export default EditAnswer;