// import logo from './logo.svg';
import './App.css';

import Notfound from './Components/404'
import Login from './Pages/login';
import signUp from './Pages/signUp';
// import Home from './Pages/user_home';
import Home from './Pages/home';
import Categorised from './Pages/categorised'
import ProductsPage from './Pages/productsPage'
import Dashboard from './Pages/user_dashboard'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { useEffect } from 'react'

function App() {
  return (
    <div className="App">
      <Router>
        
        <Switch>
          <Route exact path="/">
              {/* <Dashboard/> */}
              <Home/>
          </Route>

          {/* <Route exact path="/products" component={ProductsPage}/>  */}

          //todo not full proof yet-------------------------------------------
          <Route exact path="/store/:storename"><Home type="store"/></Route>
          <Route exact path="/preview/:storename"><Home type="preview"/></Route>
          // -----------------------------------------------------------------------
          
          <Route exact path="/store/:storename/products" component={ProductsPage}/>
          <Route exact path="/preview/:storename/products" component={ProductsPage}/>
          <Route exact path="/store/:storename/categorised/:handle" component={Categorised}/>
          <Route exact path="/preview/:storename/categorised/:handle" component={Categorised}/>

          {/* <Route exact path="/categorised/:handle" component={Categorised}/> */}
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={signUp}/>
          <Route exact path="/account" component={Dashboard}/>
          <Route exact path="/notfound" component={Notfound}/>


          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>        
      </Router>
    </div>
  );
}

export default App;
