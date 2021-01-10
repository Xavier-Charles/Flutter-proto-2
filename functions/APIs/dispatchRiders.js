const { db } = require('../util/admin');

exports.getRiderDetail = (request, response) => {
    let riderData = {};
	db
		.doc(`/dispatchRiders/${request.params.riderId}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
                riderData.userCredentials = doc.data();
                return response.json(riderData);
			}
		})
		.catch((error) => {
			console.error(error);
			return response.status(500).json({ error: error.code });
		});
}