$(document).ready(() => {
	loadSelect()
})

function showMessage(msg) {
	$('.alert').addClass('show')
	$('#alertMessage').append(msg)
}

$('#createClass').submit((e) => {
	e.preventDefault()
	let id = $('#classCode').val()
	let sem = $('#semester').val()
	let nameVal = $('#className').val()

	// Add a new document in collection "users"
	db.collection('classes')
		.doc(id)
		.set({
			className: nameVal,
			semester: sem,
		})
		.then(() => {
			console.log('Document successfully written!')
			showMessage('Class has been successfully created')
			$('#createTeacher').trigger('reset')
		})
		.catch((error) => {
			console.error('Error writing document: ', error)
		})
})

$('#createSubject').submit((e) => {
	e.preventDefault()
	let subjectCode = $('#subjectCode').val()
	let nameVal = subjectCode + '-' + $('#subjectName').val()
	let selectedClass = $('#classDropdown').val()

	db.collection('classes')
		.doc(selectedClass)
		.update({
			subject: firebase.firestore.FieldValue.arrayUnion(nameVal),
		})
		.then(() => {
			console.log('Document successfully updated!')
			$('#createSubject').trigger('reset')
			showMessage('Subject has been successfully created')
		})
		.catch((error) => {
			console.error('Error updating document: ', error)
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
