import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import ProductCard from './productCard'
import axios from 'axios';

export default function Products(props) {

    const [ProductData, setProductData] = useState({})


    useEffect(() => {
		const urlhandler = (url) => {
			return process.env.NODE_ENV === "development" ?
						 url : process.env.REACT_APP_PRODUCTION_URL + url
        }
        props.store ?
        axios
			.post(urlhandler('/products'), {store: props.store})
			.then((response) => {
				setProductData(response.data);
            })
			.catch((err) => {
				console.log(err);
            })
        :
        axios
			.get(urlhandler('/products'))
			.then((response) => {
				setProductData(response.data);
            })
			.catch((err) => {
				console.log(err);
            })
    }, [])
    
    // console.log(ProductData)

    if (props.categorised === true) {
        return(
            <PostStyle>
                {Object.values(ProductData).filter(e => e.category === props.category).map((item, id) => {
                    return(
                        <ProductCard type="store" data={item} key={id}/>
                    )
                })}
            </PostStyle>
        )
    }

    return(
            <PostStyle>
                {Object.values(ProductData).map((item, id) => {

                    return(
                        <ProductCard type="store" data={item} key={id}/>
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
    font-family: 'Roboto';
    width: 98%;
    padding-left: 2%;

`;