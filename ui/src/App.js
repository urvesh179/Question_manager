import './App.css';
import {Route,Switch} from 'react-router-dom';
import Admin from './AdminUI/App'
import Error from './Error';

function App() {

  return (
   <>
  
   <Switch>
     <Route path ="/admin" component = {Admin}/>
     <Route path="/*" component={Admin}/>
   </Switch>
   </>
  );
}

export default App;
