import firebase from "firebase/compat/app";
import "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  limit,
  QuerySnapshot,
  DocumentData,
  CollectionReference
} from "firebase/firestore";
import { ref, onUnmounted, computed, Ref, ComputedRef } from "vue";
import {
  getAuth,
  signOut
  as
  signOutFunction,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { Message, MessageWithId } from "./helper/types/message";
import { firebaseConfig } from "./helper/constants/firebase-config";
import { MESSAGES_PATH } from "./helper/constants/firebase";

firebase.initializeApp(firebaseConfig);

const auth = getAuth();

export function useAuth(): {
  user: Ref<User | null>;
  isLogin: ComputedRef<boolean>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
} {
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
const messagesCollection = collection(firestore, MESSAGES_PATH) as CollectionReference<Message, DocumentData>;
const messagesQuery = query<Message, DocumentData>(messagesCollection, orderBy("createdAt", "desc"), limit(100));

function snapshotProcessing(snapshot: QuerySnapshot<Message, DocumentData>): MessageWithId[] {
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .reverse();
}

export function useChat(): {
  messages: Ref<MessageWithId[]>;
  sendMessage: (text: string) => void;
} {
  const messages = ref<MessageWithId[]>([]);
  const unsubscribe = onSnapshot<Message, DocumentData>(messagesQuery,
    snapshot => messages.value = snapshotProcessing(snapshot)
  );
  onUnmounted(unsubscribe);

  const { user, isLogin } = useAuth();
  const sendMessage = (text: string) => {
    if (!isLogin.value) return;
    if (!user?.value) return;
    const { photoURL, uid, displayName } = user.value;
    addDoc(collection(firestore, MESSAGES_PATH), {
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: serverTimestamp(),
    });
    
  };

  return { messages, sendMessage };
}
