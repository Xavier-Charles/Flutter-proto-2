import React from 'react';
import styled from 'styled-components'

export default function QuoteBox(props) {

    return(
    props.top ?
    
        <QuoteBoxStyle>
            <div className="textbox">
                <p className="title">{props.title}</p>
                <p className="text">{props.text}</p>
            </div>
        </QuoteBoxStyle> 
        : 
        <QuoteBoxStyle2>
            <div className="textbox">
                <p className="title">{props.title}</p>
                <p className="text">{props.text}</p>
            </div>
        </QuoteBoxStyle2>
    )

}

const QuoteBoxStyle = styled.div`

    display: flex;
    margin-top: 100vh;
    height: 70vh;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';


    .textbox {
        display: block;
        align-items: center;
        width: 80vw;
        max-width: 400px;

        .title {
            font-size: 1.5em
        }
        .text {
            font-size: 1em
        }
    }
`
const QuoteBoxStyle2 = styled.div`

    display: flex;
    margin-top: 0vh;
    height: 70vh;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';


    .textbox {
        display: block;
        align-items: center;
        width: 80vw;
        max-width: 400px;

        .title {
            font-size: 1.5em
        }
        .text {
            font-size: 1em
        }
    }
`