import React, {useState} from 'react' 
import './App.css'
import Home from './Pages/home'
import Login from './Pages/login'
import signUp from './Pages/signUp'
import Checkout from './Pages/checkout'
import Notfound from './Components/404'
import { CartContext } from './util/context'
import Dashboard from './Pages/user_dashboard'
import ProductsPage from './Pages/productsPage'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  const [cart, setCart] = useState([])

  return (
    <CartContext.Provider value={{cart, setCart}}>
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
            <Route exact path="/checkout" component={Checkout}/>
            <Route exact path="/notfound" component={Notfound}/>
            <Route path="*" component={Notfound}/>
          </Switch>        
        </Router>
      </div>
    </CartContext.Provider>
  );
}

export default App;
