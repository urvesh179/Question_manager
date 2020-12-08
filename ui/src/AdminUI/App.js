import { Switch, Route, withRouter, Redirect } from 'react-router'
import { useUserState } from '../Context/UserContext';

import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout";
import AddLanguage from './Components/Language/AddLanguage';
import EditLanguage from './Components/Language/EditLanguage';
import LanguageList from './Components/Language/LanguageList';
function App(props) {

  var { token } = useUserState();

  var content = null;
 
  return (
    <>
      {token == null && content == null ? <Redirect to="/admin/login" /> : null}

      <Switch>
        
        <Route path="/admin/login" exact component={Login} />
        <Route path="/admin/logout" exact component={Logout} />
        <Route path="/admin/" exact component={Dashboard} />

        <Route path="/admin/addlanguage" exact component={AddLanguage} />
        <Route path="/admin/languagelist" exact component={LanguageList} />
        <Route path="/admin/editlanguage/:id" exact component={EditLanguage} />
      </Switch>
    </>
  );
}


export default withRouter(App);