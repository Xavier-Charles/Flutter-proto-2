// import logo from './logo.svg';
import './App.css';

import Notfound from './Components/404'
import login from './Pages/login';
import signUp from './Pages/signUp';
import Home from './Pages/user_home';
import Categorised from './Pages/categorised'
import ProductsPage from './Pages/productsPage'
import Dashboard from './Pages/user_dashboard'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        
        <Switch>
          <Route exact path="/">
              <Home/>
          </Route>

          <Route exact path="/products" component={ProductsPage}/> 

          <Route exact path="/categorised/:handle" component={Categorised}/>
          <Route exact path="/login" component={login}/>
          <Route exact path="/signup" component={signUp}/>
          <Route exact path="/account" component={Dashboard}/>

          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>        
      </Router>
    </div>
  );
}

export default App;
