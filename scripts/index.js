$(document).ready(() => {
	loadSelect()
})

$('#createStudent').submit((e) => {
	e.preventDefault()
	let id = $('#RegNo').val()
	let nameVal = $('#name').val()
	let dobVal = $('#dob').val()
	let emailVal = $('#email').val()
	let passwordVal = $('#password').val()
	let phoneNoVal = $('#phoneNo').val()
	let userTypeVal = 'student'
	let selectedClass = $('#classDropdown').val()

	// Add a new document in collection "users"
	db.collection('users')
		.doc(id)
		.set({
			name: nameVal,
			dob: dobVal,
			email: emailVal,
			phone: phoneNoVal,
			userType: userTypeVal,
			class: selectedClass,
		})
		.then(() => {
			console.log('Document successfully written!')

			//calling cloud function to create a user in firebase with the email and password
			const functions = firebase.functions()
			const addUser = functions.httpsCallable('createNewUser')
			addUser({
				email: emailVal,
				password: passwordVal,
				displayName: name,
			}).then((result) => {
				console.log(result)
			})
			$('#createStudent').trigger('reset')
		})
		.catch((error) => {
			console.error('Error writing document: ', error)
		})
})

//admin creation
$('#createAdmin').submit((e) => {
	e.preventDefault()
	let emailVal = $('#emailAdmin').val()

	//calling cloud function to create another admin in firebase with the email
	const functions = firebase.functions()
	const addAdminRole = functions.httpsCallable('addAdminRole')
	addAdminRole({ email: emailVal }).then((result) => {
		console.log(result)
		var res = result.data
		var found = res.includes('Error')
		if (found) {
			console.log(res)
			return
		}
		console.log(res)
		return
	})
})

function loadSelect() {
	db.collection('classes')
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for qu	ery doc snapshots
				console.log(doc.id, ' => ', doc.data())
				$('#classDropdown').append(
					'<option value="' +
						doc.id +
						'">' +
						doc.data().className +
						'</option>'
				)
			})
		})
		.catch((error) => {
			console.log('Error getting documents: ', error)
		})
}
