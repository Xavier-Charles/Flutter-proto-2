import axios from 'axios';
import { v4 } from 'uuid'
// import Flutterwave from 'flutterwave-node-v3'
 
// let tPUBLIC_KEY = 'FLWPUBK_TEST-1f90c6d3eb092c2fd235881ff950f3ac-X'
// let tSECRET_KEY = 'FLWSECK_TEST-deae5ea8c99f2da60a86583951742143-X'
// const flw = new Flutterwave(tPUBLIC_KEY, tSECRET_KEY  );

// export const charge_with_token = async (curr, amount, User) =>{
 
//     try {
 
//         const payload = {
//             "token": "flw-t1nf-cff007a7699efee339c9271b9be4f3d7-m03k", //This is the card token returned from the transaction verification endpoint as data.card.token
//             "currency": curr,
//             "country": "NG",
//             "amount": amount,
//             // "email": "user@gmail.com",
//             // "first_name": "temi",
//             // "last_name": "desola",
//             "narration": "Activate Store",
//             "tx_ref": "MCs"+Date.now(),
//             "redirect_url":"https://flutter-proto-1.web.app/account"
//         }
//        const response =  await flw.Tokenized.charge(payload)
//        console.log(response);
//     } catch (error) {
//         console.log(error)
//     }                            
   
// }

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
				if (res.status === 200) {
                    let accountData = {
                        "account_bank":customer.bank,
                        "account_number":customer.account_no,
                        "business_name":customer.storename,
                        "business_email":customer.email,
                        "business_contact":"Anonymous",
                        "business_contact_mobile":customer.phoneNumber,
                        "business_mobile":customer.phoneNumber,
                        "country":customer.country,
                        "split_type":"flat",
                        "split_value":100
                    }
                    axios
                        .post(`https://nameless-shelf-51198.herokuapp.com/https://api.flutterwave.com/v3/subaccounts`, accountData)
                        .then((response) => {
                            //! Move to the back.
                            console.log(response)
                            if (response.data.status === "success"){
                                window.location.assign(res.data.data.link)
                            }
                        })
                        .catch((err) => console.log({err}))
				}
            })
			.catch((error) => {
                console.log({error});
                window.location.reload()
            });
}

export const verify_trans = async (tx_id, user, Amt, curr) => {

	axios.defaults.headers.common = { Authorization: `Bearer ${process.env.NODE_ENV === 'development'? process.env.REACT_APP_FLUTTER_S_KEY_TEST : process.env.REACT_APP_FLUTTER_S_KEY}` };
    axios
        .get(`https://nameless-shelf-51198.herokuapp.com/https://api.flutterwave.com/v3/transactions/${tx_id}/verify`)
        .then(res => {
            if (res.data.status === "success" && res.data.data.amount === Amt && 
                res.data.data.currency === curr && res.data.data.customer.email === user.email) {
                    console.log('verified')
                axios
                    .post(urlhandler(`/activate/${user.username}`))
                    .then(() => window.location.reload())
                    .catch(err => console.log(err))

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
 