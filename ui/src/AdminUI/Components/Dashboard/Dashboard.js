import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import * as lactions from '../../../Actions/LanguageAction';
import * as actions from '../../../Actions/QuestionAction';

import { useLanguageDispatch, useLanguageState } from '../../../Context/LanguageContext';
import { useQuestionDispatch, useQuestionState } from '../../../Context/QuestionContext';

function Dashboard(props) {


    var style = {
        height: "150px"
    }

    var path = "../assets/images/bottom-bg.png";
    var bgImageStyle = {
        backgroundImage: "url(" + path + ")",
        height: "100%",
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat'
    }

    var { languages } = useLanguageState();
    var languageDispatch = useLanguageDispatch();

    var { questions } = useQuestionState();
    var questionDispatch = useQuestionDispatch();

    var [language, setLanguage] = useState("-1");
    var [que, setQue] = useState("");
    var [flag, setFlag] = useState(0);

    useEffect(async () => {
        await lactions.getAllLanguage(languageDispatch);
    }, [])

    var lan = languages.map(l => {
        lan = (<option value={l._id}>{l.name}</option>)
        return lan;
    })

    const getQuestion = async (event) => {
        event.preventDefault();
        var word = event.target.value

        setQue(word)
        if (word == "" && language == "-1") {
            setFlag(0)
        }
        else {
            let data = "";
            if (language !== "-1" && word!=="") {
                data = {
                    question: word,
                    languageId: language
                }
            }
            else if(language == "-1" && word!=="") {
                data = {
                    question: word
                }
            }
            else{
                data = {
                    languageId: language
                }
            }
            setFlag(1);
            await actions.getSearchQuestion(questionDispatch, data);
        }
    }

    const getQuestionByLang = async (event) => {
        event.preventDefault();
        var lan = event.target.value;
        setLanguage(lan)
        let data = "";
        if (lan == "-1") {
            setFlag(0)
        }
        else {
            if (que !== "") {
                data = {
                    question: que,
                    languageId: lan,
                }
            }
            else {
                data = {
                    languageId: lan,
                }
            }
            setFlag(1);
            await actions.getSearchQuestion(questionDispatch, data);
        }

    }

    const viewanswer = (id) => {
        props.history.push("/admin/searchanswerlist/" + id)
    }

    var data = null;
    data = questions.map(q => {

        data = (
            <tr>
                <td><a href="#" onClick={() => viewanswer(q._id)}>{q.question}</a></td>
            </tr>
        )
        return data;
    })

    return (
        <>
            <Header />
            <div className="page-content" style={{ height: "100%" }} >
                <Sidebar />

                <div className="content-wrapper" style={bgImageStyle}>
                    <div className="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                        <div className="d-flex">
                            <div className="breadcrumb">
                                <a href="/admin" className="breadcrumb-item"><i className="icon-home2 mr-2"></i> Home</a>
                                <span className="breadcrumb-item active">Dashboard</span>
                            </div>
                            <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                        </div>
                    </div>


                    <div class="content">

                        <div class="row" style={{ marginBottom: "50px" }}>
                            <div class="col-md-12">

                                <div class="card">
                                    <div class="card-header header-elements-inline">

                                    </div>

                                    <div class="card-body">
                                        <form>
                                            <div class="form-group row">
                                                <div class="col-lg-9">
                                                    <input class="form-control" type="text" name="question"
                                                        placeholder="Search Your Question Here"
                                                        value={que} onChange={getQuestion} />
                                                </div>
                                                <div class="col-lg-3">
                                                    <select id="language" name="language" class="form-control" required=""
                                                        onChange={getQuestionByLang} value={language}>
                                                        <option value="-1">Select Language</option>
                                                        {lan}
                                                    </select>
                                                </div>
                                            </div>
                                            {flag !== 0 ? <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Result Found</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data}
                                                </tbody>
                                            </table>
                                                : null}

                                        </form>
                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;