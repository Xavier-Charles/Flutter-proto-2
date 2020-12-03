import React from 'react';
import Nav from '../Components/nav'
import Products from '../Components/products'
import Footer from '../Components/footer'

function ProductsPage() {

    return(
        <React.Fragment>
            <Nav/>           
            <Products/>
            <section id="contact">
              <Footer/>
            </section>
        </React.Fragment>
    )
}

export default ProductsPage