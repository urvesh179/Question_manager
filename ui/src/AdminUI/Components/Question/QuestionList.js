import React, { useEffect } from 'react'

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import * as actions from '../../../Actions/QuestionAction';

import { useQuestionDispatch, useQuestionState } from '../../../Context/QuestionContext';

function QuestionList(props) {

    var questionDispatch = useQuestionDispatch();
    var { questions } = useQuestionState();

    useEffect(async () => {
        await actions.getAllQuestion(questionDispatch);
    }, [])

    const edit = (id) => {
        props.history.push("/admin/editquestion/" + id)
    }

    const remove = async (id) => {
        if (window.confirm('Are you sure to delete this Question ?')) {
            await actions.removeQuestion(questionDispatch, id);
            await actions.getAllQuestion(questionDispatch);
        }
    }

    var data = null;
    data = questions.map(q => {
       
        var lan = "";
		q.languageId.forEach(l => {
			lan += l.name +  " "
		});
        data = (
            <tr>
                <td>{lan}</td>
                <td>{q.question}</td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-center">
                    <div class="list-icons">
                        <div class="dropdown">
                            <a href="#" class="list-icons-item" data-toggle="dropdown">
                                <i class="icon-menu9"></i>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right">
                                <a onClick={() => edit(q._id)} class="dropdown-item"><i class="icon-pencil"></i>Edit</a>
                                <a onClick={() => remove(q._id)} class="dropdown-item"><i class="icon-cross2"></i>Delete</a>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>

        )
        return data;
    })

    const addquestion = () => {
        props.history.push("/admin/addquestion");
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
                                <h4> <span class="font-weight-semibold">Question List</span></h4>
                                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
                            </div>


                        </div>

                        <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                            <div class="d-flex">
                                <div class="breadcrumb">
                                    <a href="/admin" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Dashboard</a>
                                    <a href="/admin/questionlist" class="breadcrumb-item">Question List</a>

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
                                        <h5 class="card-title"></h5>
                                        <div class="header-elements">
                                            <div class="list-icons">
                                                <button onClick={addquestion} class="btn bg-teal-400 ml-3">Add <i class="icon-plus3 ml-2"></i></button>

                                            </div>
                                        </div>
                                    </div>

                                    <table class="table datatable-basic table-hover">
                                        <thead>
                                            <tr>
                                                <th>Language</th>
                                                <th>Question</th>
                                                <th colSpan="4" class="text-center">Actions</th>
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

export default QuestionList;