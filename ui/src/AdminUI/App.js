import { Switch, Route, withRouter, Redirect } from 'react-router'
import { useUserState } from '../Context/UserContext';

import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout";
import AddLanguage from './Components/Language/AddLanguage';
import LanguageList from './Components/Language/LanguageList';
import EditLanguage from './Components/Language/EditLanguage';
import AddQuestion from './Components/Question/AddQuestion';
import QuestionList from './Components/Question/QuestionList';
import EditQuestion from './Components/Question/EditQuestion';
import AnswerList from './Components/Question/AnswerList';
import EditAnswer from './Components/Question/EditAnswer';
import SearchAnswerList from './Components/Question/SearchAnswerList';
import AddAnswer from './Components/Question/AddAnswer';
import { useEffect } from 'react';


function App(props) {

  var { token } = useUserState();

  var content = null;
  // const load = ()=>{
  //   window.location="/admin"
  // }
  // useEffect(()=>{
  //   load()
  // },[localStorage.getItem('user')])
 
  return (
    <>
      {token == null  ? <Redirect to="/admin/login" /> : null}

      <Switch>
        
        <Route path="/admin/login" exact component={Login} />
        <Route path="/admin/logout" exact component={Logout} />
        <Route path="/admin/" exact component={Dashboard} />

        <Route path="/admin/addlanguage" exact component={AddLanguage} />
        <Route path="/admin/languagelist" exact component={LanguageList} />
        <Route path="/admin/editlanguage/:id" exact component={EditLanguage} />

        <Route path="/admin/addquestion" exact component={AddQuestion} />
        <Route path="/admin/questionlist" exact component={QuestionList} />
        <Route path="/admin/searchanswerlist/:id" exact component={SearchAnswerList} />
        <Route path="/admin/editquestion/:id" exact component={EditQuestion} />
        <Route path="/admin/answerlist/:id" exact component={AnswerList} />
        <Route path="/admin/editanswer/:id" exact component={EditAnswer} />
        <Route path="/admin/addanswer/:id" exact component={AddAnswer}/>

      </Switch>
    </>
  );
}


export default withRouter(App);