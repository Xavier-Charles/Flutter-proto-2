import React from 'react';
import Nav from '../Components/nav'
import Products from '../Components/products'
import Footer from '../Components/footer'

function ProductsPage(props) {
    // console.log(props);
    return(
        <React.Fragment>
            <Nav/>           
            <Products store={props.match.params.storename}/>
            <section id="contact">
              <Footer/>
            </section>
        </React.Fragment>
    )
}

export default ProductsPage