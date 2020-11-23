$('#createTeacher').submit((e) => {
	e.preventDefault()
	let id = $('#teacherID').val()
	let nameVal = $('#name').val()
	let dobVal = $('#dob').val()
	let emailVal = $('#email').val()
	let passwordVal = $('#password').val()
	let phoneNoVal = $('#phoneNo').val()
	let userTypeVal = 'teacher'

	// Add a new document in collection "users"
	db.collection('users')
		.doc(id)
		.set({
			name: nameVal,
			dob: dobVal,
			email: emailVal,
			phone: phoneNoVal,
			userType: userTypeVal,
			class: 'not assigned',
			subjects: 'not assigned',
		})
		.then(() => {
			console.log('Document successfully written!')

			//calling cloud function to create a user in firebase with the email and password
			const functions = firebase.functions()
			const addUser = functions.httpsCallable('createNewUser')
			addUser({
				email: emailVal,
				password: passwordVal,
				displayName: nameVal,
			}).then((result) => {
				console.log(result)
				$('#createTeacher').trigger('reset')
			})
		})
		.catch((error) => {
			console.error('Error writing document: ', error)
		})
})
