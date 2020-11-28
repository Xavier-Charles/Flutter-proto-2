const functions = require('firebase-functions');
const app = require('express')();
const {
    getAllProducts, getOneProduct, postOneProduct, deleteProduct, editProduct
} = require('./APIs/BKNDproducts')
const {
    loginUser, signUpUser, uploadProfilePhoto, getUserDetail, updateUserDetails
} = require('./APIs/users')
const auth = require('./util/auth');

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//todo find a way to replace "auth" in get methods
app.get('/products', auth, getAllProducts);
app.get('/products', auth, getOneProduct);
app.post('/product', auth, postOneProduct);
app.delete('/product/:productId', auth, deleteProduct);
app.put('/product/:productId', auth, editProduct);

app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);



exports.api = functions.https.onRequest(app);



