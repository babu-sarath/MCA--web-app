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
		})
		.then(() => {
			console.log('Document successfully written!')

			auth.createUserWithEmailAndPassword(emailVal, passwordVal)
				.then((user) => {
					console.log('Created User', user)
					window.location.replace(
						'../teacher/teacherAssign.html?id=' + id
					)
				})
				.catch((error) => {
					console.log('Error ', error)
				})

			$('#createTeacher').trigger('reset')
		})
		.catch((error) => {
			console.error('Error writing document: ', error)
		})
})
