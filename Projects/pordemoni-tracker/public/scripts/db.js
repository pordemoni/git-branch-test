// Initialize Cloud Firestore through Firebase
const firebaseConfig = {
	apiKey: "AIzaSyADOJWserBX9Bf8NQmWR1DWqdaZJvPEroY",
	authDomain: "pordemoni-tracker.firebaseapp.com",
	databaseURL: "https://pordemoni-tracker.firebaseio.com",
	projectId: "pordemoni-tracker",
	storageBucket: "",
	messagingSenderId: "294990422095",
	appId: "1:294990422095:web:09175a6bd312c262afca3a",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const collection_ref = db.collection("logs");
