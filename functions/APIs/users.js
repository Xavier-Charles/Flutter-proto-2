const { admin, db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');

// firebase.initializeApp(config);

const { validateLoginData, validateSignUpData } = require('../util/validators');
const { response } = require('express');

// Login
exports.loginUser = (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password
    }

    const { valid, errors } = validateLoginData(user);
	if (!valid) return response.status(400).json(errors);

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return response.json({ token });
        })
        .catch((error) => {
            console.error(error);
            return response.status(403).json({ general: 'wrong credentials, please try again'});
        })
};

exports.signUpUser = (request, response) => {

    const newUser = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        storename: request.body.storename,
        phoneNumber: request.body.phoneNumber,
        email: request.body.email,
        country: request.body.country,
		password: request.body.password,
		confirmPassword: request.body.confirmPassword,
        activated: false
    };

    const { valid, errors } = validateSignUpData(newUser);

	if (!valid) return response.status(400).json(errors);

    let token, userId, dispatchRider;

    db
        .doc(`/storenames/${newUser.storename}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                throw { code: 'storename-error' }
            } else {
                db
                    .doc(`/storenames/${newUser.storename}`)
                    .set({store: newUser.storename})
                return firebase
                        .auth()
                        .createUserWithEmailAndPassword(
                            newUser.email, 
                            newUser.password
                    );
            }
        })
        .then(async(data) => {
            userId = data.user.uid;
            
            dispatchRider = await db.collection(`/dispatchRiders`)
                    .where("country", "==", request.body.country)
                    .limit(1)
                    .get()
                    .then((doc) => {
                        let id
                        doc.forEach(doc => id = doc.id)
                        return id
                    })
            return data.user.getIdToken();
        })
        .then((idtoken) => {
            token = idtoken;
            const userCredentials = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                phoneNumber: newUser.phoneNumber,
                country: newUser.country,
                email: newUser.email,
                storename: newUser.storename,
                dispatchRider,
                categories: [],
                products: [],
                activated: false,
                createdAt: new Date().toISOString(),
                username: userId,
                userId
            };
            return db
                    .doc(`/users/${userId}`)
                    .set(userCredentials);
        })
        .then(()=>{
            return response.status(201).json({ token });
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'storename-error'){
                return response.status(400).json({ storename: 'This storename already exists' });
			}else if (err.code === 'auth/email-already-in-use') {
                db.doc(`/storenames/${request.body.storename}`).delete()
				return response.status(400).json({ email: 'Email already in use' });
            } else {
                admin.auth().deleteUser(userId)
                db.doc(`/storenames/${request.body.storename}`).delete()
				return response.status(500).json({ general: 'Something went wrong, please try again' });
			}
		});
}

deleteImage = (imageName) => {
    const bucket = admin.storage().bucket();
    const path = `${imageName}`
    return bucket.file(path).delete()
    .then(() => {
        return
    })
    .catch((error) => {
        return
    })
}

// Upload profile picture
exports.uploadProfilePhoto = (request, response) => {
    const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
	const fs = require('fs');
	const busboy = new BusBoy({ headers: request.headers });

	let imageFileName;
	let imageToBeUploaded = {};
	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
			return response.status(400).json({ error: 'Wrong file type submited' });
		}
		const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${request.user.username}.${imageExtension}`;
		const filePath = path.join(os.tmpdir(), imageFileName);
		imageToBeUploaded = { filePath, mimetype };
		file.pipe(fs.createWriteStream(filePath));
    });
    deleteImage(imageFileName);
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
			.then(() => {
				const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
				return db.doc(`/users/${request.user.username}`).update({
					imageUrl
				});
			})
			.then(() => {
				return response.json({ message: 'Image uploaded successfully' });
			})
			.catch((error) => {
				console.error(error);
				return response.status(500).json({ error: error.code });
			});
	});
	busboy.end(request.rawBody);
};

exports.getUserDetail = (request, response) => {
    let userData = {};
	db
		.doc(`/users/${request.user.username}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
                userData.userCredentials = doc.data();
                return response.json(userData);
			}	
		})
		.catch((error) => {
			console.error(error);
			return response.status(500).json({ error: error.code });
		});
}

exports.updateUserDetails = (request, response) => {
    
    db
        .doc(`/users/${request.user.username}`)
        .get()
        .then(async (userdoc) => {
            let doc = await db.doc(`/storenames/${request.body.storename}`).get()
            if (doc.exists && request.body.storename !== userdoc.data().storename) {
                throw { code: 'storename-error' }
            } else {
                db
                    .doc(`/storenames/${userdoc.data().storename}`)
                    .delete()
                    .then(() =>{
                        db
                            .doc(`/storenames/${request.body.storename}`)
                            .set({store: request.body.storename})
                    })
            }

        })
        .then(() => {
            let document = db.collection('users').doc(`${request.user.username}`);
            document.update(request.body)
        })
        .then(()=> {
            response.json({message: 'Updated successfully'});
        })
        .catch((error) => {
            console.error(error);
            if (error.code === 'storename-error' ){
                return response.status(400).json({ storename: 'This storename already exists' });
            }
            return response.status(500).json({ 
                message: "Cannot Update the value"
            });
        });
}

exports.activateUser = (request, response) => {
    
    let document = db.doc(`/users/${request.params.username}`)

    document.update({activated: true})
        .then(()=> {
            response.json({message: 'Activated'});
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ 
                message: "Cannot Activate"
            });
    });
}

exports.getStore = (request, response) => {
    
    db
        .doc(`/storenames/${request.params.storename}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                throw { code: 'storename-error' }
            } else {
                db
                    .collection(`/users`)
                    .where("storename", "==", request.params.storename)
                    .limit(1)
                    .get()
                    .then((doc) => {
                        let data;
                        doc.forEach(doc => {
                            data = doc.data()
                            // console.log(data);
                        })
                        return response.json(data)
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            if (error.code === 'storename-error' ){
                return response.status(500).json({ message: 'This store does not exist' });
            }
            return response.status(500).json({ 
                message: "Internal error"
            });
        });
            
}