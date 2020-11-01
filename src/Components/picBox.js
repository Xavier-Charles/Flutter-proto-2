import React from 'react';
import styled from 'styled-components'

import img4x from '../assets/pexels-ike-louie-natividad-1400x850.jpg'

import img4 from '../assets/pexels-ike-louie-natividad-450x800.jpg'

export default function PicBox(props) {

    //!---------------------------------------------------------------------
    // Declare a new state variable with the "useState" Hook
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 620;

    React.useEffect(() => {
        /* Inside of a "useEffect" hook add an event listener that updates
        the "width" state variable when the window size changes */
        window.addEventListener("resize", () => setWidth(window.innerWidth));

        /* passing an empty array as the dependencies of the effect will cause this
        effect to only run when the component mounts, and not each time it updates.
        We only want the listener to be added once */
    }, [])
    //!---------------------------------------------------------------------

    return (
        <PicBoxStyle>
            <img src={width > breakpoint? img4x :img4}></img>
            <div className="textbox">
                <p className="title">Style is a way to say who you are without having to speak</p>
                <p className="text">
                    We’re challenging the way the clothing industry operates. 
                    The way we source. The way we sew. The way we sell.
                </p>
            </div>
        </PicBoxStyle>
    )

}

const PicBoxStyle = styled.div`

    font-family: 'Roboto';
    position: relative;

    img {
        width: 100%;
    }

    .textbox {
        position: absolute;
        bottom: 5%;
        left: 5%;
        display: block;
        width: 80vw;
        max-width: 400px;
        text-align: left;
        color: #fcfff8;

        .title {
            font-size: 1.3em
        }
        .text {
            font-size: 0.8em
        }
    }
`