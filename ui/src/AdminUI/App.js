import { Switch, Route, withRouter, Redirect } from 'react-router'

import { useUserState } from '../Context/UserContext';

import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout";

function App(props) {

  var { token } = useUserState();

  var content = null;
  console.log(props.location.pathname)
 
  return (
    <>
      {token == null && content == null ? <Redirect to="/admin/login" /> : null}

      <Switch>
        
        <Route path="/admin/login" exact component={Login} />
        <Route path="/admin/logout" exact component={Logout} />
        <Route path="/admin/" exact component={Dashboard} />
      </Switch>
    </>
  );
}


export default withRouter(App);