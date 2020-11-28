const { db } = require('../util/admin');

exports.getAllProducts = (request, response) => {
    // return response.status(500).json(request)
    db
        .collection('products')
        .where('username', '==', request.user.username)
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let products = [];
			data.forEach((doc) => {
				products.push({
                    productId: doc.id,
                    name: doc.data().name,
					img: doc.data().img,
					price: doc.data().price,
					createdAt: doc.data().createdAt,
				});
			});
			return response.json(products);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
}

exports.getOneProduct = (request, response) => {
	db
        .doc(`/products/${request.params.productId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return response.status(404).json(
                    { 
                        error: 'Product not found' 
                    });
            }
            if(doc.data().username !== request.user.username){
                return response.status(403).json({error:"UnAuthorized"})
            }
			ProductData = doc.data();
			ProductData.productId = doc.id;
			return response.json(ProductData);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: error.code });
		});
};

exports.postOneProduct = (request, response) => {
	if (request.body.img.trim() === '') {
		return response.status(400).json({ body: 'Must not be empty' });
    }
    
    // if(request.body.price === 0) {
    //     return response.status(400).json({ title: 'Price must not be empty' });
    // }
    
    const newProductItem = {
        username: request.user.username,
        name: request.body.name === '' ? 'null' : request.body.name,
        img: request.body.img,
        price: request.body.price,
        createdAt: new Date().toISOString()
    }
    db
        .collection('products')
        .add(newProductItem)
        .then((doc)=>{
            const responseProductItem = newProductItem;
            responseProductItem.id = doc.id;
            return response.json(responseProductItem);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};

exports.deleteProduct = (request, response) => {

    const document = db.doc(`/products/${request.params.productId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Product not found' })
            }
            if (doc.data().username !== request.user.username){
                return response.status(403).json({error:"UnAuthorized"})
            }
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.editProduct = ( request, response ) => { 
    if(request.body.productId || request.body.createdAt){
        response.status(403).json({message: 'Not allowed to edit'});
    }
    let document = db.collection('products').doc(`${request.params.productId}`);
    document.update(request.body)
    .then(()=> {
        response.json({message: 'Updated successfully'});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ 
                error: err.code 
        });
    });
};
