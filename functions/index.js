const cors = require('cors');
const app = require('express')();
const functions = require('firebase-functions');

let allowedOrigins = ['http://localhost:3000',
                      'http://127.0.0.1:5001/flutter-proto-2/us-central1/api',
                      'http://localhost:5001/flutter-proto-2/us-central1/api',
                      'http://localhost:5000',
                      'https://fyrozine.com',
                      'https://flutter-proto-2.web.app',
                      'https://flutter-proto-2.firebaseapp.com'
                    ];
// Automatically allow cross-origin requests
// app.use(cors({ origin: true }));
app.use(cors({
  origin: function(origin, callback){

    // allow requests with no origin (e.g mobile apps, curl requests)
    if(!origin) return callback(null, true);
    // console.log(origin)
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const auth = require('./util/auth');
const firebase = require('firebase');
const config = require('./util/config');
const { getRiderDetail } = require('./APIs/dispatchRiders')
const {
    getAllProducts, getAllUserProducts, getOneProduct, postOneProduct, deleteProduct, editProduct
} = require('./APIs/BKNDproducts')
const {
    loginUser, signUpUser, uploadProfilePhoto, getUserDetail, updateUserDetails, activateUser, getStore
} = require('./APIs/users')

firebase.initializeApp(config);

//todo find a way to replace "auth" in get methods
app.get('/products', getAllProducts); // all products from all stores
app.post('/products', getAllUserProducts); // all products from just one store
app.post('/product', auth, postOneProduct);
app.put('/product/:productId', auth, editProduct);
app.get('/products/:productId', auth, getOneProduct);
app.delete('/del_product/:productId', auth, deleteProduct);

app.get('/store/:storename', getStore);

app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);
app.post('/activate/:username', activateUser)
app.post('/user/image', auth, uploadProfilePhoto);

app.get('/dispatchRider/:riderId', getRiderDetail)

exports.apiz = functions.https.onRequest(app);
exports.api = functions.https.onRequest(app);


