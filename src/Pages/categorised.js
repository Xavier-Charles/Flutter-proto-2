import React from 'react';
import Nav from '../Components/nav'
import CatProducts from '../Components/Catproducts'
import Footer from '../Components/footer'

function Categorised(props) {
    return(
        <React.Fragment>
            <Nav/>           
            <CatProducts category={props.match.params.handle}/>
            <section id="contact">
            <Footer/>
            </section>
        </React.Fragment>
    )
}

export default Categorised