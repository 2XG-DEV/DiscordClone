import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBSj3vvtIgXJc3SSM_uGtWjHO_q9_InwH0",
  authDomain: "discordclone-f7337.firebaseapp.com",
  projectId: "discordclone-f7337",
  storageBucket: "discordclone-f7337.appspot.com",
  messagingSenderId: "167105530012",
  appId: "1:167105530012:web:5825df264dc014c47e0559",
  measurementId: "G-2H8VT00SW7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
