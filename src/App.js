// import logo from './logo.svg';
import './App.css';

import HeaderCarousel from './Components/headerCarousel'
import Nav from './Components/nav'
import QuoteBox from './Components/quoteBox'
import PicBox from './Components/picBox'
import Products from './Components/products'
import CatProducts from './Components/Catproducts'
import CategoriesBox from './Components/Categories'
import Footer from './Components/footer'
import Notfound from './Components/404'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Router>
        <Nav/>
        <Switch>
          <Route exact path="/">
              <HeaderCarousel/>
              <QuoteBox top={true} title="RESPONSIBLY MADE FOR THE LONG HAUL" text="We’re challenging the way the 
                          clothing industry operates. The way we source. The way we sew. The way we sell."/>
              <PicBox/>
              <QuoteBox title="FREE SHIPPING & RETURNS" text="We repair or replace any defect outside
                          of normal wear for life and we’ll cover the cost of shipping your gear."/>
              <section id="wrapper">
                <CategoriesBox/>
              </section>
          </Route>

          <Route path="/categories">            
              <CategoriesBox/>
          </Route>

          <Route path="/products">            
              <Products/>
          </Route>

          <Route exact path="/categorised/:handle" component={CatProducts} />            

          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>
        <section id="contact">
          <Footer/>
        </section>
        
      </Router>
    </div>
  );
}

export default App;
