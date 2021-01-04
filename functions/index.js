const functions = require('firebase-functions');

const cors = require('cors');
const app = require('express')();


let allowedOrigins = ['http://localhost:3000',
                      'http://127.0.0.1:5001/flutter-proto-2/us-central1/api',
                      'http://localhost:5001/flutter-proto-2/us-central1/api',
                      'http://localhost:5000',
                      'https://fyrozine.com',
                      'https://flutter-proto-1.web.app',
                      'https://flutter-proto-1.firebaseapp.com'
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

const {
    getAllProducts, getOneProduct, postOneProduct, deleteProduct, editProduct
} = require('./APIs/BKNDproducts')
const {
    loginUser, signUpUser, uploadProfilePhoto, getUserDetail, updateUserDetails, activateUser, getStore
} = require('./APIs/users')
const auth = require('./util/auth');

const config = require('./util/config');

const firebase = require('firebase');

firebase.initializeApp(config);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//todo find a way to replace "auth" in get methods
app.post('/products', getAllProducts);
app.get('/products/:productId', auth, getOneProduct);
app.post('/product', auth, postOneProduct);
app.delete('/del_product/:productId', auth, deleteProduct);
app.put('/product/:productId', auth, editProduct);

app.post('/login', loginUser);
app.post('/signup', signUpUser);

app.get('/store/:storename', getStore);

app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);
app.post('/activate/:username', activateUser)

// exports.api = functions.region('europe-west3').https.onRequest(app);
exports.apiz = functions.https.onRequest(app);
exports.api = functions.https.onRequest(app);


