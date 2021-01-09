const { admin, db } = require('../util/admin');
const config = require('../util/config');
const { v4 } = require('uuid')

exports.getAllProducts = async (request, response) => {
            
    db
        .collection('products')
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
                    description: doc.data().description,
                    createdAt: doc.data().createdAt,
                    category: doc.data().category,
                    link: doc.data().link
				});
			});
			return response.json(products);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
}

exports.getAllUserProducts = async (request, response) => {
    // return response.status(500).json(request)
    // console.log(request.body, request.params)
    let owner = await
    db
        .collection(`/users`)
        .where("storename", "==", request.body.store)
        .limit(1)
        .get()
        .then((doc) => {
            let data;
            doc.forEach(doc => {
                data = doc.data()
            })
            return data
        })
        .catch((err) => {
			console.error(err);
			return response.status(500).json({ error: error.code });
        });

    db
        .collection('products')
        .where('username', '==', owner.username)
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
                    description: doc.data().description,
                    createdAt: doc.data().createdAt,
                    category: doc.data().category,
                    link: doc.data().link
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
    const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
    const fs = require('fs');
    const pId = v4();
	const busboy = new BusBoy({ headers: request.headers });

    let imageFileName;
    let imageToBeUploaded = {};
    let fields = new Map();
    

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
			return response.status(400).json({ error: 'Wrong file type submited' });
		}
		const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${pId+'&'+request.user.username}.${imageExtension}`;
		const filePath = path.join(os.tmpdir(), imageFileName);
		imageToBeUploaded = { filePath, mimetype };
        file.pipe(fs.createWriteStream(filePath));
    });

    busboy.on('field', function(fieldname, val) {
      fields[fieldname] = val;
    });

	busboy.on('finish', () => {
		admin
			.storage()
			.bucket()
			.upload(imageToBeUploaded.filePath, {
				resumable: false,
				metadata: {
					metadata: {
						contentType: imageToBeUploaded.mimetype
					}
				}
            })
			.then(async() => {
				const img = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
                let num

                await db
                    .collection('users')
                    .doc(`${request.user.username}`)
                    .get()
                    .then((doc) => {
                        user = doc.data()
                        let document = db.collection('users').doc(`${request.user.username}`);
                        user.products.push(pId)

                        if (user.phoneNumber/10000000000 < 1) {
                            num = 234*10000000000 + (user.phoneNumber%10000000000)
                        }else num = user.phoneNumber

                        if ( !user.categories.includes(fields.category) && fields.category !== "") {
                            user.categories.push(fields.category)
                        }
                        document.update(user)
                    
                    })

                const link = `${"https://wa.me/" + num + "?text=I%20want%20Product%20" + fields.name}`
                const newProductItem = {
                    id: pId,
                    username: request.user.username,
                    name: fields.name,
                    img,
                    price: fields.price,
                    link,
                    category: fields.category,
                    description: fields.description,
                    createdAt: new Date().toISOString()
                }
                db
                    .collection('products')
                    .add(newProductItem)
                    .then((doc)=>{
                        const responseProductItem = newProductItem;
                        responseProductItem.id = doc.id;
                    })
                    .catch((err) => {
                        response.status(500).json({ error: 'Something went wrong' });
                        console.error(err);
                    });

			})
			.then(() => {
				return response.json({ message: 'Product added successfully' });
			})
			.catch((error) => {
				console.error(error);
				return response.status(500).json({ error: error.code });
			});
	});
	busboy.end(request.rawBody);
    
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

    // console.log(request.user)
    // return response.status(403).json({message: 'Not allowed to edit'})

    const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
	const fs = require('fs');
	const busboy = new BusBoy({ headers: request.headers });

    let imageFileName;
    let imageToBeUploaded = {};
    var fields = new Map();
    

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
			return response.status(400).json({ error: 'Wrong file type submited' });
        }
		const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${v4()+'&'+request.user.username}.${imageExtension}`;
		const filePath = path.join(os.tmpdir(), imageFileName);
		imageToBeUploaded = { filePath, mimetype };
        file.pipe(fs.createWriteStream(filePath));
    });

    busboy.on('field', function(fieldname, val) {
      fields[fieldname] = val;
    });

    busboy.on('finish', async function() {
        fields = Object.fromEntries(Object.entries(fields))
        // console.log(imageToBeUploaded);
        if(fields.productId || fields.createdAt){
            response.status(403).json({message: 'Not allowed to edit'});
        }
        // if(true){
        //     response.status(403).json({message: 'Not allowed to edit'});
        // }

        if (Object.keys(imageToBeUploaded).length !== 0) {
            await admin
                .storage()
                .bucket()
                .upload(imageToBeUploaded.filePath, {
                    resumable: false,
                    metadata: {
                        metadata: {
                            contentType: imageToBeUploaded.mimetype
                        }
                    }
            })
            fields.img = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        }else {delete fields.img}
        let num
        await db
            .collection('users')
            .doc(`${request.user.username}`)
            .get()
            .then((doc) => {
                user = doc.data()

                if (user.phoneNumber/10000000000 < 1) {
                        num = 234*10000000000 + (user.phoneNumber%10000000000)
                        user.phoneNumber = num
                }else num = user.phoneNumber

                if ( !user.categories.includes(fields.category) && fields.category !== "") {
                    user.categories.push(fields.category)
                    let document = db.collection('users').doc(`${request.user.username}`);
                    document.update(user)
                }else {delete fields.category}
            })

        fields.link = `${"https://wa.me/" + num + "?text=I%20want%20Product%20" + fields.name}`
        let document = db.collection('products').doc(`${request.params.productId}`);
        // console.log(document)
        // return response.status(403).json({message: 'Not allowed to edit'});
        document.update(fields)
        .then(()=> {
            response.json({message: 'Updated successfully'});
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ 
                    error: err.code 
            });
        });
    });
    busboy.end(request.rawBody); 
};
