import React, { useEffect, useState } from 'react'

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import * as actions from '../../../Actions/AnswerAction';

import { useAnswerDispatch, useAnswerState } from '../../../Context/AnswerContext';

function AnswerList(props) {

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

    var data = null;

    data = answers.map(a => {
        data = (
            <tr>
                <td dangerouslySetInnerHTML={{ __html: a.answer }}></td>
                <td></td>
                <td></td>
                <td class="text-center">
                    <div class="list-icons">
                        <div class="dropdown">
                            <a href="#" class="list-icons-item" data-toggle="dropdown">
                                <i class="icon-menu9"></i>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right">
                                <a onClick={() => edit(a._id)} class="dropdown-item"><i class="icon-pencil"></i>Edit</a>
                                <a onClick={() => remove(a._id)} class="dropdown-item"><i class="icon-cross2"></i>Delete</a>
                            </div>
                        </div>
                    </div>
                </td>
                <td></td>
                <td></td>
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
                                <h4> <span class="font-weight-semibold">Answer List</span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
                                    <a href="/admin/answerlist" class="breadcrumb-item">Answer List</a>

                                </div>

                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>
                    </div>

                    <div class="content">

                        <div class="row" style={{ marginBottom: "50px" }}>
                            <div class="col-md-12">

                                <div class="card">


                                    <table class="table datatable-basic table-hover">

                                        <thead>
                                            <tr>
                                                <td colSpan="6" style={{textAlign:'center',fontWeight:'bold',color:'orange'}}><h3>Question : {question}</h3></td>
                                            </tr>
                                            <tr>
                                                <th>Answer</th>
                                                <th colSpan="5" class="text-center">Actions</th>
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

export default AnswerList;