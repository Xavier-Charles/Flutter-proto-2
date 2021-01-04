import React from 'react';
import styled from 'styled-components'

import { Link, withRouter } from 'react-router-dom';
import logo from '../assets/frozlintell.png'

function Footer(props) {

    // let storename = props.match.params.storename
	// let home = props.location.pathname.includes('store') ? 
	// 	`/store/${storename}`:
	// 	`/preview/${storename}`

    return (
        <Styled>
            <div className="textbox">
                <Link className="Nav-brand-logoless" to={"/"}>Jumga</Link>
                <input type="email" class="long" placeholder="Email Address"></input>
                <button type="submit" class="fill">{'>'}</button>
                <p className="text">Recieve 20% off your first purchase</p>
                <p className="textBold"></p>
            </div>
            <div className="textbox">
                <p className="title">CALL US</p>
                <p className="text">We’d love to engage in some good old fashioned conversation. Available M–F 9am–5pm GMT+1.</p>
                <p className="textBold">+234 806 956 8502</p>
            </div>
            <div className="textbox">
                <p className="title">CHAT</p>
                <p className="text">Relive the glory days when instant messenger was king. Hit us with a “sup”; 7 days 9–6 GMT+1.</p>
                <p className="textBold">+234 806 956 8502</p>
            </div>
            <div className="textbox">
                <p className="title">EMAIL</p>
                <p className="text">Drop us a line anytime and we’ll get back to you within 24 hours.</p>
                <p className="textBold">tjedi257@gmail.com</p>
            </div>
            {/* <div className="end">
                <p>©2020 Powered by fyr</p>
            </div> */}
        </Styled>
    )
}

export default withRouter(Footer);

const Styled = styled.div`
    
    min-height: 50vh;
    display: flex;
    flex-wrap: wrap;

    .Nav-brand-logo {
		display: block;
        background-position: 0px 0px;
        margin: 31px 0;
		background-image: url(${logo}); 
		background-size: 120px 26px;
		background-repeat: no-repeat;
		height: 49px;
		width: 200px;
		text-indent: -1000%;
		-webkit-tap-highlight-color: transparent;
	}
    .Nav-brand-logoless {
		display: block;
        text-decoration: none;
        color: #1e1e23;
        opacity: 1;
        font-family: Roboto;
        font-size: 1.70em;
        font-weight: 300;
        margin: 27px 0 41px 0;
		/* margin-left: 1.3em; */
	}

    .textbox {
        display: block;
        align-items: center;
        width: 80vw;
        min-width: 250px;
        max-width: 250px;
        text-align: left;
        padding: 20px 20px 20px 15px;


        .title {
            font-size: 1.5em;
        }
        .text {
            font-size: 1em;
        }
        .textBold {
            font-size: 1em;
            font-weight: 500;
        }
        input.long {
            flex: 1 0 350px;
            height: 25px;
            width: 220px;
            max-width: 100%;
            border-radius: 0;
            border: 1px solid black;
        }

        button {
            color: white;
            height: 29px;
            background: black;
            border: 0;
        }
  
    }

    .end {
        display: block;
        text-align: left;

        p{

        }
    }
    
`
