import firebase from "firebase/compat/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "@/helper/constants/firebase-config";

class FirebaseService {
  firestore!: Firestore;

  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.firestore = getFirestore();
  }
}

export default new FirebaseService();
