import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/database'
import 'firebase/storage'




const firebaseConfig = {
	apiKey: "AIzaSyDd266FkTvElVSOS9jIM6nUN0qEMx3KTv0",
	authDomain: "web-chat-a202a.firebaseapp.com",
	databaseURL: "https://web-chat-a202a-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "web-chat-a202a",
	storageBucket: "web-chat-a202a.appspot.com",
	messagingSenderId: "1029604711377",
	appId: "1:1029604711377:web:35b9f9607d3ec0abea9ef0"
};




class firebaseMethods {
	constructor() {
		firebase.initializeApp(firebaseConfig)
		this.auth = firebase.auth()
		this.db = firebase.firestore()
	}

	 async  login(email, password) {
		await this.auth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, surname, email, password) {

		await this.auth.createUserWithEmailAndPassword(email, password).then(function(){
		}).catch(function(error){
			alert(error.message);
        })

		firebase.auth().currentUser.updateProfile({
			displayName: name+' '+surname,
			photoURL: 'https://firebasestorage.googleapis.com/v0/b/web-chat-a202a.appspot.com/o/noavatar.png?alt=media&token=ffd06bf9-691f-46c3-a065-b0b3069e4c7a',
		  })

		 return firebase.database().ref().child('/users/'+firebase.auth().currentUser.uid).set({
			name: name,
			surname: surname,
			email: email,
			id: this.auth.currentUser.uid,
			ProfilePicture:'https://firebasestorage.googleapis.com/v0/b/web-chat-a202a.appspot.com/o/noavatar.png?alt=media&token=ffd06bf9-691f-46c3-a065-b0b3069e4c7a',
		});
	}


	isUserSignedIn() {
		return firebase.auth().currentUser;
	}


	

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.email
	}

	


}

export default new firebaseMethods()