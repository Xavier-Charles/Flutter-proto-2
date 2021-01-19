import React, { useState, useContext, useEffect } from 'react';

import Nav from '../Components/nav'
import styled from 'styled-components'
import { CartContext } from '../util/context'

import { Link, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { checkout } from '../util/Pay';


var t = {}
var n = {}

function Checkout (props) {
    const {cart, setCart} = useContext(CartContext)
    const [num, setNum] = useState({})
    const [formState, setFormState] = useState({})
    const [total, setTotal] = useState({
        total: 0,
        subTotal: 0,
        tax: 0,
        shipping: 0
    })

    // console.log(cart)
    useEffect(() => {
        let ids = cart.map(o => o.productId)
        let filteredCart = cart.filter(({productId}, index) => !ids.includes(productId, index + 1))

        filteredCart.map((item) => {n[item.productId] = 1})
        if (ids.length !== filteredCart.length) setCart(filteredCart)
        setNum({...num, ...n})
        handleTotal(filteredCart)
    }, [cart]);

    function handleNum (e, id) {
        n[id] = e.target.value? e.target.value : 0
        setNum({...num, ...n})
        handleTotal(cart)
    }

    function handleTotal (carte) {
        t.subTotal = carte.reduce((cur, item) => cur + parseInt(parseInt(item.price) * (n[item.productId]? n[item.productId] : 1) ) , 0)
        t.shipping = parseInt((t.subTotal * 0.025).toFixed(0))
        t.tax = parseInt((t.subTotal * 0.013).toFixed(0))
        t.total = t.subTotal + t.shipping + t.tax
        setTotal({...t})
    }

    const handleChange = (event) => {
		setFormState({
			[event.target.name]: event.target.value,
			errors: []
		});
	};

    function form() {
        let errors = formState.errors
        return (
            <FormStyle>
            <form className="form" noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="phoneNumber"
									label="Phone Number"
									name="phoneNumber"
									autoComplete="tel"
									pattern="[7-9]{1}[0-9]{9}"
									helperText={errors ? errors.phoneNumber: ""}
									error={errors && errors.phoneNumber ? true : false}
									onChange={handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									helperText={errors ? errors.email: ""}
									error={errors && errors.email ? true : false}
									onChange={handleChange}
								/>
							</Grid>

                            <Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="address"
									label="Address"
									name="address"
									autoComplete="address"
									helperText={errors ? errors.address: ""}
									error={errors && errors.address ? true : false}
									onChange={handleChange}
								/>
							</Grid>
						</Grid>

					</form>
            </FormStyle>
        )
        
    }

    function handleSubmit() {
        if (formState.email && formState.phoneNumber && formState.address){
            checkout(total.total, formState, cart)
        }
    }

    return (
            <React.Fragment>
            <Nav/>
            <CheckoutStyle>
                <div className="wrap cf">
                    <div className="heading cf">
                        <h1>Your Jumga Cart</h1>
                        <Link onClick={() => window.history.back()} className="continue">Continue Shopping</Link>
                    </div>
                    <div className="cart">
                        <ul className="cartWrap">
                            {cart.map((item, id) => {
                                return(
                                    <li className="items odd" key={id}>
                                        <div className="infoWrap"> 
                                            <div className="cartSection">
                                                <img src={item.img} alt="" className="itemImg" />
                                                <p className="itemNumber">{`#${item.productId}`}</p>
                                                <h3>{item.name}</h3>
                                                <p> 
                                                    <input type="number" 
                                                            min="0"
                                                            onChange={(e) => handleNum(e, item.productId)} 
                                                            className="qty" 
                                                            value={num[item.productId]}
                                                    />
                                                    {` x $${item.price}`}
                                                </p>
                                                <p className="stockStatus"> In Stock</p>
                                            </div>  

                                            <div className="prodTotal cartSection">
                                                <p>${item.price * num[item.productId]}</p>
                                            </div>
                                            <div className="cartSection removeWrap">
                                                <a onClick={() => setCart(cart.filter((product) => product.productId !== item.productId))} className="remove">x</a>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                
                    {/* <div className="promoCode">
                        <label htmlFor="promo">Have A Promo Code?</label>
                        <input type="text" name="promo" placholder="Enter Code" />
                        <a href="#" className="btn"></a>
                    </div> */}
                    {form()}
                    {Object.keys(num).length === 0 ? 
                        (<p>No Products in your Cart yet</p>):
                        (
                        <div className="subtotal cf">
                            <ul>
                                <li className="totalRow"><span className="label">Subtotal</span><span className="value">${total.subTotal}</span></li>
                                <li className="totalRow"><span className="label">Shipping</span><span className="value">${total.shipping}</span></li>
                                <li className="totalRow"><span className="label">Tax</span><span className="value">${total.tax}</span></li>
                                <li className="totalRow final"><span className="label">Total</span><span className="value">${total.total}</span></li>
                                <li className="totalRow"><a href="#" onClick={handleSubmit} className="btn continue">Checkout</a></li>
                            </ul>
                        </div>
                        )}
                </div>
            </CheckoutStyle>
            </React.Fragment>
    )
}

export default withRouter(Checkout);

const FormStyle = styled.div`
    .form {
        width : 80%;
        margin: 0 auto;

    }
`

const CheckoutStyle = styled.div`

    @import url(https://fonts.googleapis.com/css?family=Montserrat:400,700);
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
    }

    html {
    line-height: 1;
    }

    ol, ul {
    list-style: none;
    }

    table {
    border-collapse: collapse;
    border-spacing: 0;
    }

    caption, th, td {
    text-align: left;
    font-weight: normal;
    vertical-align: middle;
    }

    q, blockquote {
    quotes: none;
    }
    q:before, q:after, blockquote:before, blockquote:after {
    content: "";
    content: none;
    }

    a img {
    border: none;
    }

    article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
    display: block;
    }

    * {
    box-sizing: border-box;
    }

    body {
    color: #333;
    -webkit-font-smoothing: antialiased;
    font-family: "Roboto";
    }

    img {
    max-width: 100%;
    }

    .cf:before, .cf:after {
    content: " ";
    display: table;
    }

    .cf:after {
    clear: both;
    }

    .cf {
    *zoom: 1;
    }

    .wrap {
    width: 75%;
    max-width: 960px;
    margin: 0 auto;
    padding: 5% 0;
    margin-bottom: 5em;
    margin-top: 4%;
    }

    .heading {
    padding: 1em 0;
    border-bottom: 1px solid #D0D0D0;
    }
    .heading h1 {
    font-family: "Montserrat", serif;
    font-size: 2em;
    float: left;
    }
    .heading a.continue:link, .heading a.continue:visited {
    text-decoration: none;
    font-family: "Montserrat", sans-serif;
    letter-spacing: -.015em;
    font-size: .75em;
    padding: 1em;
    color: #fff;
    background: #000;
    font-weight: bold;
    border-radius: 50px;
    float: right;
    text-align: right;
    -webkit-transition: all 0.25s linear;
    -moz-transition: all 0.25s linear;
    -ms-transition: all 0.25s linear;
    -o-transition: all 0.25s linear;
    transition: all 0.25s linear;
    }
    .heading a.continue:after {
    content: "\\276f";
    padding: .5em;
    position: relative;
    right: 0;
    -webkit-transition: all 0.15s linear;
    -moz-transition: all 0.15s linear;
    -ms-transition: all 0.15s linear;
    -o-transition: all 0.15s linear;
    transition: all 0.15s linear;
    }
    .heading a.continue:hover, .heading a.continue:focus, .heading a.continue:active {
    background: #f69679;
    }
    .heading a.continue:hover:after, .heading a.continue:focus:after, .heading a.continue:active:after {
    right: -10px;
    }

    .tableHead {
    display: table;
    width: 100%;
    font-family: "Montserrat", sans-serif;
    font-size: .75em;
    }
    .tableHead li {
    display: table-cell;
    padding: 1em 0;
    text-align: center;
    }
    .tableHead li.prodHeader {
    text-align: left;
    }

    .cart {
    padding: 1em 0;
    }
    .cart .items {
    display: block;
    width: 100%;
    /* vertical-align: middle; */
    padding: 1.5em;
    border-bottom: 1px solid #fafafa;
    }
    .cart .items.even {
    background: #fafafa;
    }
    .cart .items .infoWrap {
    display: table;
    width: 100%;
    }
    .cart .items .cartSection {
    display: table-cell;
    vertical-align: middle;
    }
    .cart .items .cartSection .itemNumber {
    font-size: .75em;
    color: #777;
    margin-bottom: .5em;
    }
    .cart .items .cartSection h3 {
    font-size: 1em;
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: .025em;
    }
    .cart .items .cartSection p {
    display: inline-block;
    font-size: .85em;
    color: #777777;
    font-family: "Montserrat", sans-serif;
    }
    .cart .items .cartSection p .quantity {
    font-weight: bold;
    color: #333;
    }
    .cart .items .cartSection p.stockStatus {
    color: #000;
    font-weight: bold;
    padding: .5em 0 0 1em;
    text-transform: uppercase;
    }
    .cart .items .cartSection p.stockStatus.out {
    color: #F69679;
    }
    .cart .items .cartSection .itemImg {
    width: 4em;
    float: left;
    }
    .cart .items .cartSection.qtyWrap, .cart .items .cartSection.prodTotal {
    text-align: center;
    }
    .cart .items .cartSection.qtyWrap p, .cart .items .cartSection.prodTotal p {
    font-weight: bold;
    font-size: 1.25em;
    }
    .cart .items .cartSection input.qty {
    width: 2em;
    text-align: center;
    font-size: 1em;
    padding: .25em;
    margin: 1em .5em 0 0;
    }
    
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
    .cart .items .cartSection .itemImg {
    width: 8em;
    display: inline;
    padding-right: 1em;
    }

    .special {
    display: block;
    font-family: "Montserrat", sans-serif;
    }
    .special .specialContent {
    padding: 1em 1em 0;
    display: block;
    margin-top: .5em;
    border-top: 1px solid #dadada;
    }
    .special .specialContent:before {
    content: "\\21b3";
    font-size: 1.5em;
    margin-right: 1em;
    color: #6f6f6f;
    font-family: helvetica, arial, sans-serif;
    }

    a.remove {
    text-decoration: none;
    font-family: "Montserrat", sans-serif;
    color: #ffffff;
    cursor: pointer;
    font-weight: bold;
    background: #e0e0e0;
    padding: .5em;
    font-size: .75em;
    display: inline-block;
    border-radius: 100%;
    line-height: .85;
    -webkit-transition: all 0.25s linear;
    -moz-transition: all 0.25s linear;
    -ms-transition: all 0.25s linear;
    -o-transition: all 0.25s linear;
    transition: all 0.25s linear;
    }
    a.remove:hover {
    background: #f30;
    }

    .promoCode {
    border: 2px solid #efefef;
    float: left;
    width: 35%;
    padding: 2%;
    }
    .promoCode label {
    display: block;
    width: 100%;
    font-style: italic;
    font-size: 1.15em;
    margin-bottom: .5em;
    letter-spacing: -.025em;
    }
    .promoCode input {
    width: 85%;
    font-size: 1em;
    padding: .5em;
    float: left;
    border: 1px solid #dadada;
    }
    .promoCode input:active, .promoCode input:focus {
    outline: 0;
    }
    .promoCode a.btn {
    float: left;
    width: 15%;
    padding: .75em 0;
    border-radius: 0 1em 1em 0;
    text-align: center;
    border: 1px solid #000;
    }
    .promoCode a.btn:hover {
    border: 1px solid #f69679;
    background: #f69679;
    }

    .btn:link, .btn:visited {
    text-decoration: none;
    font-family: "Montserrat", sans-serif;
    letter-spacing: -.015em;
    font-size: 1em;
    padding: 1em 3em;
    color: #fff;
    background: #000;
    font-weight: bold;
    border-radius: 50px;
    float: right;
    text-align: right;
    -webkit-transition: all 0.25s linear;
    -moz-transition: all 0.25s linear;
    -ms-transition: all 0.25s linear;
    -o-transition: all 0.25s linear;
    transition: all 0.25s linear;
    }
    .btn:after {
    content: "\\276f";
    padding: .5em;
    position: relative;
    right: 0;
    -webkit-transition: all 0.15s linear;
    -moz-transition: all 0.15s linear;
    -ms-transition: all 0.15s linear;
    -o-transition: all 0.15s linear;
    transition: all 0.15s linear;
    }
    .btn:hover, .btn:focus, .btn:active {
    background: #f69679;
    }
    .btn:hover:after, .btn:focus:after, .btn:active:after {
    right: -10px;
    }
    .promoCode .btn {
    font-size: .85em;
    padding: .5em 2em;
    }

    /* TOTAL AND CHECKOUT  */
    .subtotal {
    float: right;
    width: 35%;
    }
    .subtotal .totalRow {
    padding: .5em;
    text-align: right;
    }
    .subtotal .totalRow.final {
    font-size: 1.25em;
    font-weight: bold;
    }
    .subtotal .totalRow span {
    display: inline-block;
    padding: 0 0 0 1em;
    text-align: right;
    }
    .subtotal .totalRow .label {
    font-family: "Montserrat", sans-serif;
    font-size: .85em;
    text-transform: uppercase;
    color: #777;
    }
    .subtotal .totalRow .value {
    letter-spacing: -.025em;
    width: 35%;
    }

    @media only screen and (max-width: 39.375em) {
    .wrap {
        width: 98%;
        padding: 2% 0;
    }

    .heading {
        padding: 1em;
        font-size: 90%;
    }

    .cart .items .cartSection {
        width: 90%;
        display: block;
        float: left;
    }
    .cart .items .cartSection.qtyWrap {
        width: 10%;
        text-align: center;
        padding: .5em 0;
        float: right;
    }
    .cart .items .cartSection.qtyWrap:before {
        content: "QTY";
        display: block;
        font-family: "Montserrat", sans-serif;
        padding: .25em;
        font-size: .75em;
    }
    .cart .items .cartSection.prodTotal, .cart .items .cartSection.removeWrap {
        display: none;
    }
    .cart .items .cartSection .itemImg {
        width: 25%;
    }

    .promoCode, .subtotal {
        width: 100%;
    }

    a.btn.continue {
        width: 100%;
        text-align: center;
    }
    }
`
