import React, { Component } from 'react';
import QuoteBox from '../Components/quoteBox'
import PicBox from '../Components/picBox'
import HeaderCarousel from '../Components/headerCarousel'
import Nav from '../Components/nav'
import CategoriesBox from '../Components/Categories'
import Footer from '../Components/footer'

function Home() {

    return(
        <React.Fragment>
            <Nav/>
            <HeaderCarousel/>
              <QuoteBox top={true} title="RESPONSIBLY MADE FOR THE LONG HAUL" text="We’re challenging the way the 
                          clothing industry operates. The way we source. The way we sew. The way we sell."/>
              <PicBox/>
              <QuoteBox title="FREE SHIPPING & RETURNS" text="We repair or replace any defect outside
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

export default Home