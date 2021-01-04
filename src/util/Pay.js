import axios from 'axios';
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

export const verify_trans = async (tx_id, user, Amt, curr) => {

	axios.defaults.headers.common = { Authorization: `Bearer ${process.env.NODE_ENV === 'development'? process.env.REACT_APP_FLUTTER_S_KEY_TEST : process.env.REACT_APP_FLUTTER_S_KEY}` };
    axios
        .get(`${process.env.NODE_ENV === 'development' && 'https://cors-anywhere.herokuapp.com/'}https://api.flutterwave.com/v3/transactions/${tx_id}/verify`)
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

 

 