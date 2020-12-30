import React from 'react';
import Nav from '../Components/nav'
// import CatProducts from '../Components/Catproducts'
import Products from '../Components/products'
import Footer from '../Components/footer'

function Categorised(props) {
    return(
        <React.Fragment>
            <Nav/>           
            {/* <CatProducts /> */}
            <Products categorised={true} category={props.match.params.handle} store={props.match.params.storename}/>
            <section id="contact">
            <Footer/>
            </section>
        </React.Fragment>
    )
}

export default Categorised