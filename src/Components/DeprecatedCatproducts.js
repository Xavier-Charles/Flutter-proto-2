import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import ProductCard from './productCard'
import { authMiddleWare } from '../util/auth';
import axios from 'axios';

import img8 from '../assets/Products/1.jpg'
import img1 from '../assets/Products/2.jpg'
import img3 from '../assets/Products/3.jpg'
import img4 from '../assets/Products/4.jpg'
import img5 from '../assets/Products/5.jpg'
import img6 from '../assets/Products/6.jpg'
import img7 from '../assets/Products/7.jpg'
import img2 from '../assets/Products/8.jpg'
import img9 from '../assets/Products/9.jpg'
import img10 from '../assets/Products/10.jpg'
import img11 from '../assets/Products/11.jpg'
import img12 from '../assets/Products/12.jpg'
import img13 from '../assets/Products/13.jpg'

const data = {

        1: {img: img1, link:"https://wa.me/2348064757678?text=I%20want%20Product%201", price: 2000, cat: 'shoes' },
        2: {img: img2, link:"https://wa.me/2348064757678?text=I%20want%20Product%202", price: 4000, cat: 'bags' },
        3: {img: img3, link:"https://wa.me/2348064757678?text=I%20want%20Product%203", price: 2300, cat: 'accessories' },
        4: {img: img4, link:"https://wa.me/2348064757678?text=I%20want%20Product%204", price: 3400, cat: 'accessories' },
        5: {img: img5, link:"https://wa.me/2348064757678?text=I%20want%20Product%205", price: 5600, cat: 'bags' },
        6: {img: img6, link:"https://wa.me/2348064757678?text=I%20want%20Product%206", price: 1600, cat: 'accessories' },
        7: {img: img7, link:"https://wa.me/2348064757678?text=I%20want%20Product%207", price: 3400, cat: 'shoes' },
        8: {img: img8, link:"https://wa.me/2348064757678?text=I%20want%20Product%208", price: 4800, cat: 'shirts' },
        9: {img: img9, link:"https://wa.me/2348064757678?text=I%20want%20Product%209", price: 3700, cat: 'shoes' },
        10: {img: img10, link:"https://wa.me/2348064757678?text=I%20want%20Product%2010", price: 5100, cat: 'bags' },
        11: {img: img11, link:"https://wa.me/2348064757678?text=I%20want%20Product%2011", price: 3100, cat: 'accessories' },
        12: {img: img12, link:"https://wa.me/2348064757678?text=I%20want%20Product%2012", price: 4500, cat: 'shirts' },
        13: {img: img13, link:"https://wa.me/2348064757678?text=I%20want%20Product%2013", price: 5900, cat: 'shoes' },
        
}



export default function CatProducts(props) {

    const [ProductData, setProductData] = useState({})

    useEffect(() => {
		authMiddleWare(props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/products')
			.then((response) => {
				setProductData(response.data);
            })
			.catch((err) => {
				console.log(err);
			});
    }, [])

    console.log(props)
    return(
            <PostStyle>
                {Object.values(data).filter(e => e.cat === props.category).map((item, id) => {

                    return(
                        <div className="card" key= {id}>
                            <div className="pic">
                                <img src={item.img}></img>
                            </div>
                            <div className="buttons">
                                <a href={item.link} className="price" link=""><p><span>&#8358;</span>{item.price}</p></a>
                                <a href={item.link} className="contact" link=""><p>I want this!</p></a>
                            </div>
                        </div>
                    )
                })}
            </PostStyle>
       )
}

const PostStyle = styled.div`

    display: flex;
    flex-wrap: wrap;
    margin-top: 10vh;
    min-height: 70vh;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto';

    .card {
        display: block;
        position: relative;
        background-color: #fff;
        min-width: 300px;
        height: 330px;
        max-height: 400px;
        margin: 10px;
        border: 1px solid #000;
    }

    .pic{
        
        img {
        
            max-width: 300px;
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
            min-width: 50%;
            outline-color: transparent;
            text-decoration: none;
            font-family: roboto;
            font-weight: 100;

            p {
                margin: 0;
                color: #fff;
            }
        }

    }
`;