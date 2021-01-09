import './App.css';
import Home from './Pages/home';
import Login from './Pages/login';
import signUp from './Pages/signUp';
import Notfound from './Components/404'
import Dashboard from './Pages/user_dashboard'
import ProductsPage from './Pages/productsPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          //not full proof yet ------------------------------------------
          <Route exact path="/store/:storename" component={ProductsPage}/>
          // ------------------------------------------------------------
          <Route exact path="/newproducts" component={ProductsPage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={signUp}/>
          <Route exact path="/account" component={Dashboard}/>
          <Route exact path="/notfound" component={Notfound}/>
          <Route path="*" component={Notfound}/>
        </Switch>        
      </Router>
    </div>
  );
}

export default App;
