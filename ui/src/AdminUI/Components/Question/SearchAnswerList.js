import React, { useEffect, useState } from 'react'
import copy from "copy-to-clipboard";  

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import * as actions from '../../../Actions/AnswerAction';

import { useAnswerDispatch, useAnswerState } from '../../../Context/AnswerContext';

function SearchAnswerList(props) {

    var answerDispatch = useAnswerDispatch();
    var { answers } = useAnswerState();
    var [question, setQuestion] = useState("");
    var [id, setId] = useState(props.match.params.id);

    useEffect(async () => {
        await actions.getAllAnswerByQuestion(answerDispatch, id);
    }, [])

    useEffect(async () => {
        if (answers.length != 0) {
            setQuestion(answers[0].questionId.question)
        }
    }, [answers])

    const edit = (editId) => {
        props.history.push("/admin/editanswer/" + editId)
    }

    const remove = async (deleteId) => {
        if (window.confirm('Are you sure to delete this Answer ?')) {
            await actions.removeAnswer(answerDispatch, deleteId);
            await actions.getAllAnswerByQuestion(answerDispatch, id);
        }
    }

    const copyCodeToClipboard = (answer) => {
       copy(answer.answer);
        document.getElementById(answer._id).style.color="green";
    }

    var data = null;

    data = answers.map(a => {
        data = (
            <tr>
                <td dangerouslySetInnerHTML={{ __html: a.answer }}></td>
                <td> </td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <div id="copy-div">
                        <i className="icon-copy4" style={{color:"black"}} id={a._id} onClick={() => copyCodeToClipboard(a)}></i>
                    </div>
                </td>
            </tr>

        )
        return data;
    })



    return (
        <>
            <Header />
            <div className="page-content" style={{ height: "100%" }} >
                <Sidebar />
                <div class="content-wrapper">

                    <div class="page-header page-header-light">
                        <div class="page-header-content header-elements-md-inline" style={{ height: "55px" }}>
                            <div class="page-title d-flex">
                                <h4> <span class="font-weight-semibold">Search Answer List</span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
                                    <a href="#" class="breadcrumb-item">Search Answer List</a>

                                </div>

                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>
                    </div>

                    <div class="content">

                        <div class="row" style={{ marginBottom: "50px" }}>
                            <div class="col-md-12">

                                <div class="card">


                                    <table class="table  table-hover">

                                        <thead>
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: 'center', fontWeight: 'bold', color: '#26a69a' }}><h5>Question : {question}</h5></td>
                                            </tr>

                                        </thead>
                                        <tbody>

                                            {data}

                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchAnswerList;