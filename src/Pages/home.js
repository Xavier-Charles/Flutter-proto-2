import React from 'react'

import Nav from '../Components/nav'
import Footer from '../Components/footer'
import PicBox from '../Components/picBox'
import QuoteBox from '../Components/quoteBox'
import { withRouter } from 'react-router-dom'
import CategoriesBox from '../Components/Categories'
import HeaderCarousel from '../Components/headerCarousel'

function Home(props) {
    return(
        <React.Fragment>
            <Nav/>
            <HeaderCarousel/>
              <QuoteBox top={true} title="RESPONSIBLY MADE FOR THE LONG HAUL" text="We’re challenging the way the 
                          clothing industry operates. The way we source. The way we sell. Find the very best from our growing list of stores"/>
              <PicBox/>
              <QuoteBox title="FREE SHIPPING ON RETURNS" text="We repair or replace any defect outside
                          of normal wear for life and we’ll cover the cost of shipping your gear."/>
              <section id="wrapper">
                <CategoriesBox/>
              </section>
              <section id="contact">
                <Footer/>
              </section>
        </React.Fragment>
    )
}

export default (withRouter(Home))