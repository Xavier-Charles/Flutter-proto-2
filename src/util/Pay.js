import axios from 'axios';
import { v4 } from 'uuid'

const urlhandler = (url) => {
	return process.env.NODE_ENV === "development" ?
					url : process.env.REACT_APP_PRODUCTION_URL + url
}

export const activate = async (customer) => {

    const PayData = {
			"tx_ref": v4(),
			"amount": "20",
			"currency": "USD",
			"redirect_url": `${window.location.href}`,
			"payment_options":"account, card, banktransfer, mpesa, qr, ussd, credit, barter, mobilemoneyghana, payattitude, mobilemoneyfranco, paga, 1voucher",
			"customer":{
				"email":customer.email,
				"phonenumber":customer.phoneNumber
			},
			"customizations":{
				"title":"Jumga",
				"description":"",
			}
        }
    
    axios.defaults.headers.common = { Authorization: `Bearer ${process.env.NODE_ENV === 'development'? process.env.REACT_APP_FLUTTER_S_KEY_TEST : process.env.REACT_APP_FLUTTER_S_KEY}` };
		axios
			.post(`https://nameless-shelf-51198.herokuapp.com/https://api.flutterwave.com/v3/payments`, PayData)
			.then((res) => {
                window.location.assign(res.data.data.link)
            })
			.catch((error) => {
                console.log({error});
                window.location.reload()
            });
}

export const verify_activate = async (tx_id, user) => {

	axios.defaults.headers.common = { Authorization: `Bearer ${process.env.NODE_ENV === 'development'? process.env.REACT_APP_FLUTTER_S_KEY_TEST : process.env.REACT_APP_FLUTTER_S_KEY}` };
    axios
        .get(`https://nameless-shelf-51198.herokuapp.com/https://api.flutterwave.com/v3/transactions/${tx_id}/verify`)
        .then(res => {
            if (res.data.status === "success" && res.data.data.amount === 20 && 
                res.data.data.currency === "USD" && res.data.data.customer.email === user.email) {
                    console.log("verified")
                if (!user.subaccount_id) {
                    let accountData = {
                        "account_bank":user.bankCode,
                        "account_number":user.accountNumber,
                        "business_name":user.firstName + " " + user.lastName,
                        "business_email":user.email,
                        "business_contact":"Anonymous",
                        "business_contact_mobile":user.phoneNumber,
                        "business_mobile":user.phoneNumber,
                        "country":user.country,
                        "split_type":"flat",
                        "split_value":100
                    }
                    axios
                        .post(`https://nameless-shelf-51198.herokuapp.com/https://api.flutterwave.com/v3/subaccounts`, accountData)
                        .then((response) => {
                            //! Move to the back.
                            if (response.data.status === "success"){
                                const authToken = localStorage.getItem('AuthToken');
                                axios.defaults.headers.common = { Authorization: `${authToken}` };
                                const formRequest = {subaccount_id: response.data.data.subaccount_id};
                                axios
                                    .post(urlhandler('/user'), formRequest)
                                    .then(() => {
                                        axios
                                            .post(urlhandler(`/activate/${user.username}`))
                                            .then(() => window.location.reload())
                                            .catch(err => console.log(err))
                                    })
                                    .catch((err) => console.log({err}))
                            }
                        })
                        .catch((err) => console.log({err}))
                }
                

            }
        })

    }

 
export const checkout = async (amount, customer) => {

    const PayData = {
			"tx_ref": v4(),
			"amount": "20",
			"currency": "USD",
			"redirect_url": `${window.location.href}`,
			"payment_options":"account, card, banktransfer, mpesa, qr, ussd, credit, barter, mobilemoneyghana, payattitude, mobilemoneyfranco, paga, 1voucher",
			"customer":{
				"email":customer.email,
				"phonenumber":customer.phoneNumber
			},
			"customizations":{
				"title":"Jumga",
				"description":"",
			}
        }
    
    axios.defaults.headers.common = { Authorization: `Bearer ${process.env.NODE_ENV === 'development'? process.env.REACT_APP_FLUTTER_S_KEY_TEST : process.env.REACT_APP_FLUTTER_S_KEY}` };
		axios
			.post(`https://nameless-shelf-51198.herokuapp.com/https://api.flutterwave.com/v3/payments`, PayData)
			.then((res) => {
				console.log(res)
				if (res.status === 200) {
					window.location.assign(res.data.data.link)
				}
			})
			.catch((error) => {
                console.log({error});
                window.location.reload()
            });
}
 