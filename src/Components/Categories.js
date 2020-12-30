import React from 'react';
import styled from 'styled-components'

// import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
// import withAutoplay from 'react-awesome-slider/dist/autoplay';
import { Link, withRouter } from 'react-router-dom';


import img1 from '../assets/Categories/11.jpg'
import img2 from '../assets/Categories/22.jpg'
import img3 from '../assets/Categories/33.jpg'
import img4 from '../assets/Categories/44.jpg'

function CategoriesBox(props) {

    // const AutoplaySlider = withAutoplay(AwesomeSlider);
    // Declare a new state variable with the "useState" Hook
    // const [width, setWidth] = React.useState(window.innerWidth);
    // const breakpoint = 620;

    let home = props.location.pathname.includes('store') ? 
		`/store/${props.match.params.storename}`:
		`/preview/${props.match.params.storename}`

    // React.useEffect(() => {
    //     /* Inside of a "useEffect" hook add an event listener that updates
    //     the "width" state variable when the window size changes */
    //     window.addEventListener("resize", () => setWidth(window.innerWidth));

    //     /* passing an empty array as the dependencies of the effect will cause this
    //     effect to only run when the component mounts, and not each time it updates.
    //     We only want the listener to be added once */
    // }, [])

    return (
        <CategoriesBoxStyle>
            <a id="wrapper">
            <div  className="wrapper">
                <div className="card">
                    <div className="pic">
                        <img src={img1}></img>
                        
                        <div className="textbox">
                            <Link to={home + "/categorised/bags"} className="title">
                                Bags
                            </Link>
                        </div>
    
                    </div>
                </div>
                <div className="card">
                    <div className="pic">
                        <img src={img2}></img>
                        
                        <div className="textbox">
                            <Link to={home + "/categorised/accessories"} className="title">
                                Accessories
                            </Link>
                        </div>
    
                    </div>
                </div>
                <div className="card">
                    <div className="pic">
                        <img src={img3}></img>
                        
                         <div className="textbox">
                            <Link to={home + "/categorised/shoes"} className="title">
                                Shoes
                            </Link>
                        </div>
    
                    </div>
                </div>
                <div className="card">
                    <div className="pic">
                        <img src={img4}></img>

                         <div className="textbox">
                            <Link to={home + "/categorised/tops"} className="title">
                                Tops
                            </Link>
                        </div>
    
                    </div>
                </div>
            </div>
            </a>
        </CategoriesBoxStyle>
    )
}

export default withRouter(CategoriesBox)

const CategoriesBoxStyle = styled.div`

    position: relative;

    .wrapper {
        overflow-y: hidden;
        display:  flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;

        /* .box{
            
            display: inline-block;
            position: relative;
            img {
                height: 90vh;
            }
        } */

    }

    .textbox {
        display: flex;
        position: absolute;
        font-family: 'Roboto';
        bottom: 2em;
        left: 1em;
        text-align: left;
        align-items: center;

        .title {
            font-size: 2em;
            text-decoration: none;
            color: #fff;
        }
    }

    .card {
        display: block;
        position: relative;
        background-color: #fff;
        min-width: 300px;
        height: 300px;
        max-height: 400px;
        margin: 10px;
        border: 1px solid #000;
    }

    .pic{
        
        img {
        
            max-width: 300px;
        }
    }

    @media (min-width: 450px) {
            .wrapper::-webkit-scrollbar-track {
                box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
                background-color: #f5f5f5;
                border-radius: 7px;
            }
            .wrapper::-webkit-scrollbar {
                height: 8px;
                background-color: #f5f5f5;
            }
            .wrapper::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background-color: #fff;
                background: rgba(197, 196, 196, 0.94);
            }
        }
`


