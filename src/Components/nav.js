import React, {useState, useEffect} from 'react';

import styled from 'styled-components';
import logo from '../assets/frozlintell.png'
import { Link, withRouter } from 'react-router-dom';
import { HashLink as HLink} from 'react-router-hash-link';

function Nav (props)  {

    //! to be componentised-----------------------------------
	const [scrollPosY, setScrollPosY] = useState(window.scrollY)
	const [width, setWidth] = useState(window.innerWidth);
	const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => setScrollPosY(window.scrollY))
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, [])
    //! to be componentised-----------------------------------
    

    return (
        <NavStyle>
			<div className={scrollPosY === 0 ? "noScroll" : "onScroll"}>
				<div className="Nav-brand">
					<Link className="Nav-brand-logoless" to="/">Jumga</Link>
					<div id="menuToggle" className={width > 620 ? 'menuLarge': navOpen ? 'navOpen' : ''}>
						{width < 620 && (
							<div>
							<input onClick={() => setNavOpen(!navOpen)} type="checkbox" />                       
							<span />
							<span style={{ width: '25px' }} />
							<span />
							</div>
						)}
						<ul id="menu">
							<li>
								<Link to={"/newproducts"}>New products</Link>
							</li>
							<li>
								<HLink smooth to={"/#wrapper"}>Categories</HLink>
							</li>
							<li>
								<HLink smooth to={"/login"}>Sellers</HLink>
							</li>
						</ul>
					</div>
				</div>

			</div>
		</NavStyle>
    )
}

export default withRouter(Nav);

const NavStyle = styled.nav`
	background-color: #fff0;
	position: fixed;
	left: 50%;
	transform: translate(-50%, 0%);
	top: 0;
    width: 100%;
    max-width: 100%;
	z-index: 6;
	-webkit-transition: height 0.2s ease-in-out;
	transition: height 0.2s ease-in-out;
	height: 50px;
	
	.noScroll{
		background-color: #fff0;
	}
	.onScroll {
		border-bottom: 1px solid;
		background-color: #fff;
    	opacity: 0.9;
	}
	.Nav-brand {
		display: flex;
	}
	.Nav-brand-logo {
		display: block;
		background-position: 15px 12px;
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
        margin: 12px;
		margin-left: 1.3em;
	}

	.menuLarge {
		position: absolute; 
		right: 30px;
		width: 30em;

		ul {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			list-style-type: none;

			li {
				margin: 0 1em;

			}
		}

		a {
			text-decoration: none; 
			color: #1e1e23;
			opacity: 1;
			font-family: Roboto;
			font-size: 1.25em; 
			font-weight: 300;
			transition: 200ms;
		}
		a:hover {
			opacity: 0.5;
		}
	}

	@media (max-width: 620px) {
		#menuToggle {
			display: flex;
			flex-direction: column;
			position: absolute;
			top: 17px;
			right: 30px;
			z-index: 1;
			-webkit-user-select: none;
			user-select: none;
		}
		#menuToggle input {
			display: flex;
			width: 26px;
			height: 15px;
			position: absolute;
			cursor: pointer;
			opacity: 0;
			z-index: 2;
			-webkit-tap-highlight-color: transparent;
		}
		#menuToggle span {
			display: flex;
			width: 29px;
			height: 2px;
			margin-bottom: 5px;
			position: relative;
			background: #00000069;
			border-radius: 3px;
			z-index: 1;
			transform-origin: 5px 0px;
			transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0),
				background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0), opacity 0.55s ease;
		}
		#menuToggle span:first-child {
			transform-origin: 0% 0%;
		}
		#menuToggle span:nth-last-child(2) {
			transform-origin: 0% 100%;
		}
		#menuToggle.navOpen span {
			opacity: 1;
			transform: rotate(48deg) translate(3.5px,-6px);
			background: #36383f;
		}
		#menuToggle.navOpen span:nth-last-child(3) {
			opacity: 0;
			transform: rotate(0deg) scale(0.2, 0.2);
		}
		#menuToggle.navOpen span:nth-last-child(2) {
			transform: rotate(-45deg) translate(-3.5px,15px);
		}
		#menu {
			position: absolute;
			width: 155px;
			height: 100vh;
			box-shadow: 0 0 10px #85888c;
			//* margin: -50px 0 0 -50px;  original*/
			border-right: 5px solid #ecba70db;
			border-radius: 0px 0px 0px 270px;
			margin: -50px 0 0 371px;
			padding: 50px;
			padding-top: 85px;
			background-color: #fff;
			text-align: left;
			-webkit-font-smoothing: antialiased;
			transform-origin: 0% 0%;
			transform: translate(-100%, 0);
			transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1.0);
		}
		#menu li {
			padding: 10px 0;
			transition-delay: 2s;
			border-bottom: 1px solid #000;

		}
		#menuToggle.navOpen ul {
			transform: translate(-215%, 0);
		}
		a {
			text-decoration: none;
			color: #1e1e23;
			opacity: 1;
			font-family: Roboto;
			font-size: 1.25em;
			font-weight: 300;
			transition: 200ms;
		}
		a:hover {
			opacity: 0.5;
		}
		ul {
			padding: 0;
			list-style-type: none;
		}
	}
`;
