let db = firebase.firestore()
let auth = firebase.auth()

$(document).ready(() => {
	loadSelect()
})

$('#createClass').submit((e) => {
	e.preventDefault()
	let id = $('#classCode').val()
	let nameVal = $('#className').val()

	// Add a new document in collection "users"
	db.collection('classes')
		.doc(id)
		.set({
			className: nameVal,
		})
		.then(() => {
			console.log('Document successfully written!')
			loadSelect()
			$('#createTeacher').trigger('reset')
		})
		.catch((error) => {
			console.error('Error writing document: ', error)
		})
})

$('#createSubject').submit((e) => {
	e.preventDefault()
	let subjectCode = $('#subjectCode').val()
	let nameVal = $('#subjectName').val()
	let selectedClass = $('#classDropdown').val()

	// alert(subjectCode + nameVal + selectedClass)
	// db.collection('subjects')
	// 	.doc(subjectCode)
	// 	.set({
	// 		subjectName: nameVal,
	// 	})
	// 	.then(() => {
	// 		console.log('Document successfully inserted!')

	// 		//update to class collection
	// 		db.collection('classes')
	// 			.doc(selectedClass)
	// 			.update({
	// 				subject: subjectCode,
	// 			})
	// 			.then(() => {
	// 				console.log('Document successfully updated!')
	// 				$('#createSubject').trigger('reset')
	// 			})
	// 			.catch((error) => {
	// 				console.error('Error updating document: ', error)
	// 			})
	// 	})
	// 	.catch((error) => {
	// 		console.error('Error writing document: ', error)
	// 	})

	db.collection('classes')
		.doc(selectedClass)
		.update({
			subject: subjectCode,
		})
		.then(() => {
			console.log('Document successfully updated!')
			$('#createSubject').trigger('reset')
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
