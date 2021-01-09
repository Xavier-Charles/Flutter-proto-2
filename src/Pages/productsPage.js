import React from 'react';

import Nav from '../Components/nav'
import Footer from '../Components/footer'
import Products from '../Components/products'

function ProductsPage(props) {
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