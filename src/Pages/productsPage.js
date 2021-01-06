import React from 'react';
import Nav from '../Components/nav'
import Products from '../Components/products'
import Footer from '../Components/footer'

function ProductsPage(props) {
    console.log(props);
    let store = props.match.params.storename
    return(
        <React.Fragment>
            <Nav/>           
            <Products store={ store === undefined ? null : store}/>
            <section id="contact">
              <Footer/>
            </section>
        </React.Fragment>
    )
}

export default ProductsPage