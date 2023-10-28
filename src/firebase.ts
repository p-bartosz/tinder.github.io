import firebase from "firebase/compat/app";

import "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, limit } from "firebase/firestore";

import { ref, onUnmounted, computed } from "vue";
import { FirebaseOptions } from "firebase/app";
import { getAuth, signOut as signOutFunction, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";

interface Message {
  userName: string;
  userId: string;
  userPhotoURL: string;
  text: string;
  createdAt: number;
}

const firebaseConfig = {
  apiKey: "AIzaSyCXvatleolAvHiM7KvlRx6N0PW5HyTwYK0",
  authDomain: "vue-chat-81b86.firebaseapp.com",
  projectId: "vue-chat-81b86",
  storageBucket: "vue-chat-81b86.appspot.com",
  messagingSenderId: "1064179897888",
  appId: "1:1064179897888:web:03014049636d596ad20e45",
  measurementId: "G-77TF20Z8FB",
} as FirebaseOptions;

firebase.initializeApp(firebaseConfig);

const auth = getAuth();

export function useAuth() {
  const user = ref<User | null>(null);
  const unsubscribe = onAuthStateChanged(auth, (_user: User | null) => {
    user.value = _user;
    console.log('_user', _user);
  });
  
  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
  };
  const signOut = () => signOutFunction(auth);

  return { user, isLogin, signIn, signOut };
}

const firestore = getFirestore();
const messagesCollection = collection(firestore, "messages");
const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"), limit(100));

export function useChat() {
  const messages = ref<any>([]);
  const unsubscribe = onSnapshot(messagesQuery,
    snapshot => messages.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse()
  );
  onUnmounted(unsubscribe);

  const { user, isLogin } = useAuth();
  const sendMessage = (text: string) => {
    if (!isLogin.value) return;
    if (!user?.value) return;
    const { photoURL, uid, displayName } = user.value;
    addDoc(collection(firestore, "messages"), {
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: serverTimestamp(),
    });
    
  };

  return { messages, sendMessage };
}
