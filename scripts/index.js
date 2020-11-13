let db = firebase.firestore()
let auth = firebase.auth()

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
			auth.createUserWithEmailAndPassword(emailVal, passwordVal)
				.then((user) => {
					console.log('Created User', user)
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
