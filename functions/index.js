const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addAdminRole = functions.https.onCall((data, context) => {
	// check if request is made by an admin
	// if (context.auth.token.admin != true) {
	// 	return { error: 'only admins can create another admins.' }
	// }

	//get user and add custom claim(admin)
	return admin
		.auth()
		.getUserByEmail(data.email)
		.then((user) => {
			return admin.auth().setCustomUserClaims(user.uid, {
				admin: true,
			})
		})
		.then(() => {
			return 'Success! ' + data.email + ' has been made an admin'
		})
		.catch((err) => {
			return 'Problem creating new Admin. ' + err
		})
})

exports.deleteUserAdmin = functions.https.onCall((data, context) => {
	// if (context.auth.token.admin != true) {
	// 	return { error: 'Not an admin' }
	// }

	return admin
		.auth()
		.getUserByEmail(data.email)
		.then((user) => {
			admin
				.auth()
				.deleteUser(user.uid)
				.then(function () {
					return 'Deleted the Account'
				})
				.catch((err) => {
					return 'Error deleting User ' + err
				})
		})
		.catch((err) => {
			return err
		})
})

exports.createNewUser = functions.https.onCall((data, context) => {
	// if (context.auth.token.admin != true) {
	// 	return { error: 'Not an admin' }
	// }

	return admin
		.auth()
		.createUser({
			email: data.email,
			password: data.password,
			emailVerified: true,
		})
		.then(function (userRecord) {
			return 'User created'
		})
		.catch((err) => {
			return err
		})
})

exports.disableUser = functions.https.onCall((data, context) => {
	// if (context.auth.token.admin != true) {
	// 	return { error: 'Not an admin' }
	// }

	return admin
		.auth()
		.getUserByEmail(data.email)
		.then((user) => {
			admin
				.auth()
				.updateUser(user.uid, {
					disabled: true,
				})
				.then(function () {
					return 'Deactivated Account'
				})
				.catch((err) => {
					return 'Error deactivating User ' + err
				})
		})
		.catch((err) => {
			return err
		})
})

exports.enableUser = functions.https.onCall((data, context) => {
	// if (context.auth.token.admin != true) {
	// 	return { error: 'Not an admin' }
	// }

	return admin
		.auth()
		.getUserByEmail(data.email)
		.then((user) => {
			admin
				.auth()
				.updateUser(user.uid, {
					disabled: false,
				})
				.then(function () {
					return 'Enabled Account'
				})
				.catch((err) => {
					return 'Error enabling User ' + err
				})
		})
		.catch((err) => {
			return err
		})
})
