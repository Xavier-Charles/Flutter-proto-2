import React, {useState} from 'react';
import styled from 'styled-components'
import dayjs from 'dayjs';

export default function Products(props) {

    const [viewOpen, setViewOpen] = useState(false)
    const [delOpen, setDelOpen] = useState(false)
    // console.log(props.data)

    return(
            <CardStyle id={props.id} onClick={(event) => {setViewOpen(!viewOpen)}}>
                <div className="pic">
                    <img src={props.data.img} alt=""></img>
                </div>
                <div className="buttons">
                    <a className="price" link=""><p><span>&#8358;</span>{props.data.price}</p></a>
                    {props.type === 'dashboard' ?(
                                <React.Fragment>
                                    <a className="contact" link=""><p>Edit</p></a>
                                    <a className="contact" link=""><p>Delete</p></a>
                                </React.Fragment>
                                
                            ): (
                                <a className="contact" link=""><p>I want this!</p></a>
                            )}
                </div>

                <div id="open-modal" className={`modal-window ${viewOpen && 'modal-window-open'}`}>
                    <div>
                        <div>
                            <img src={props.data.img}></img>
                        </div>
                        <div className="content">
                            <h1>{props.data.name}</h1>
                            <p>{props.data.description}</p>
                            {/* <p><span>&#8358;</span>{props.data.price}</p> */}
                            <p>{props.type === 'dashboard' && dayjs(props.data.createdAt).fromNow() }</p>
                        </div>
                        <div className="buttons">
                            {props.type === 'dashboard' ?(
                                <React.Fragment>
                                    <a className="price" link=""><p><span>&#8358;</span>{props.data.price}</p></a>
                                    <a onClick={() => props.Edit(props.data)} className="contact" link=""><p>Edit</p></a>
                                    <a onClick={() => setDelOpen(true)} className="contact" link=""><p>Delete</p></a>
                                </React.Fragment>
                                
                            ): (
                                <React.Fragment>
                                <a onClick={() => window.open(props.data.link, "_blank")} className="price" link=""><p><span>&#8358;</span>{props.data.price}</p></a>
                                <a onClick={() => window.open(props.data.link, "_blank")} className="contact" link="">
                                    <p>I want this!</p>
                                </a>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className={`delete ${delOpen && 'delete-open'}`}>
                    <div className="block">
                        <p>Are you sure?</p>
                        <ul>
                            <li onClick={() => props.Delete(props.data)} className="red">Delete</li>
                            <li onClick={() => setDelOpen(false)}>Cancel</li>
                        </ul>
                    </div>
                </div>
            </CardStyle>
       )
}

const CardStyle = styled.div`
    display: block;
    position: relative;
    background-color: #fff;
    min-width: 300px;
    height: 330px;
    max-height: 400px;
    margin: 10px;
    border: 1px solid #000;
    font-family: 'Roboto';

    .noclick{
        pointer-events:none;
    }
    

    .pic{
        
        img {
        
            max-width: 298px;
            max-height: 400px;

        }
    }

    .buttons {
        display: flex;
        flex-wrap: wrap;
        position: absolute;
        bottom: 0;
        background-color: #000;
        width: 100%;
        height: 30px;
        justify-content: center;
        align-items: center;

        a {
            min-width: 33%;
            outline-color: transparent;
            text-decoration: none;
            font-family: roboto;
            font-weight: 100;
            cursor: pointer;

            p {
                margin: 0;
                color: #fff;
            }
        }

    }

    .dialog {
        min-width: 300px;
        height: 330px;
        max-height: 400px;
        margin: 10px;
        border: 1px solid #000;

    }

    .modal-window {
        position: fixed;
        background-color: rgba(0, 0, 0, 57%);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 90;
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
    }

    .modal-window-open {
        visibility: visible;
        opacity: 1;
        pointer-events: auto;
        overflow-y: scroll;
    }
    .modal-window > div {
        position: absolute;
        top: 10%;
        left: 50%;
        -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
        background: #fff;
        min-width: 300px;
        min-height: 330px;
        border: 1px solid #000;

        img {
            max-width: calc(100% - 2px);
            max-height: 80vh;
;
        }

        .buttons{
            position: relative
        }

        .content {
            text-align: left;
            margin-left: 10px;
            width: 90%
        }
    }
    .modal-window header {
        font-weight: bold;
    }
    .modal-window h1 {
        font-size: 150%;
        margin: 0 0 15px;
    }

    /* .modal-close {
        color: #aaa;
        line-height: 50px;
        font-size: 80%;
        position: absolute;
        right: 0;
        text-align: center;
        top: 0;
        width: 70px;
        text-decoration: none;
    }
    .modal-close:hover {
        color: black;
        } */
    
    .delete {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 900;
        visibility: hidden;
        opacity: 0;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;

        .block {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
            background: #fff;
            width: 175px;
            min-height: 75px;
            border: 1px solid #000;
        }

        ul {
            display: flex;
			flex-direction: row;
			justify-content: center;
            align-items: center;
            padding: 0;
			list-style-type: none;

            li {
				margin: 0 1em;
                z-index: 909;
                cursor: pointer;
			}

            .red {
                color: red;
            }
        }
    }
    .delete-open {
        visibility: visible;
        opacity: 1;
        background-color: #c6cfff80;
    }
`;