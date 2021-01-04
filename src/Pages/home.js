import React, { useEffect, useState } from 'react';
import QuoteBox from '../Components/quoteBox'
import PicBox from '../Components/picBox'
import HeaderCarousel from '../Components/headerCarousel'
import Nav from '../Components/nav'
import CategoriesBox from '../Components/Categories'
import Footer from '../Components/footer'

import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';


import axios from 'axios';
import { withRouter } from 'react-router-dom';

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '46%',
		top: '35%'
	},
});


function Home(props) {
    // console.log(props)
    // const authToken = localStorage.getItem('AuthToken');
    let storename = props.match.params.storename
    let [data, setData] = useState({
      uiLoading: true
    })

     useEffect(() => {
      setData({...data, uiLoading: true})
      const urlhandler = (url) => {
        return process.env.NODE_ENV === "development" ?
              url : process.env.REACT_APP_PRODUCTION_URL + url
      }
        // axios
        //   .get(urlhandler(`/store/${storename}`))
        //   .then((response) => {
        //     // console.log(response)
        //     if (response.data.activated === false && props.type === 'store') {
        //       props.history.push('/notfound');
        //     }
        //     // console.log(response.data);
        //     setData({
        //       firstName: response.data.firstName,
        //       lastName: response.data.lastName,
        //       email: response.data.email,
        //       phoneNumber: `+${response.data.phoneNumber}`,
        //       country: response.data.country,
        //       storename: response.data.storename,
        //       categories: response.data.categories,
        //       activated: response.data.activated,
        //       uiLoading: false
        //     })
        //   })
        //   .catch(error => {
        //     console.log(error.message)
        //     props.history.push('/notfound');
        //   })
        setData({...data, uiLoading: false})
    }, [])

    if (data.uiLoading === true) {
			return (
				<div className={props.classes.root}>
					{data.uiLoading && <CircularProgress size={50} className={props.classes.uiProgess} />}
				</div>
			);
    }else
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

export default withStyles(styles)(withRouter(Home))