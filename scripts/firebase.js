// Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyAO1UpIZCXavicZ185nFJMhsqDq-nLITvE',
	authDomain: 'kjc-mca-plus.firebaseapp.com',
	databaseURL: 'https://kjc-mca-plus.firebaseio.com',
	projectId: 'kjc-mca-plus',
	storageBucket: 'kjc-mca-plus.appspot.com',
	messagingSenderId: '456589900870',
	appId: '1:456589900870:web:b6a7f591c2b2bfae979e47',
	measurementId: 'G-Z7BVL55S2Y',
}

// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

//make auth and functions references
const auth = firebase.auth()
const db = firebase.firestore()

auth.onAuthStateChanged((user) => {
	console.log(user)
	if (user == null || user.uid != '63zuDESUJAUeYHyAi1OAvgpCc3A2') {
		window.location.href = 'login.html'
	}
})
