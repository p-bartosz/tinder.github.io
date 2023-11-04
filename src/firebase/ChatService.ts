import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  limit,
  QuerySnapshot,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";
import { ref, onUnmounted } from "vue";
import AuthService from "./AuthService";
import { Message, MessageWithId } from "@/helper/types/message";
import { MESSAGES_PATH } from "@/helper/constants/firebase";
import FirebaseService from './FirebaseService'

class ChatService {
  messages = ref<MessageWithId[]>([]);
  private messagesCollection = collection(FirebaseService.firestore, MESSAGES_PATH) as CollectionReference<Message, DocumentData>;
  private messagesQuery = query<Message, DocumentData>(this.messagesCollection, orderBy("createdAt", "desc"), limit(100));
  private unsubscribe = onSnapshot<Message, DocumentData>(this.messagesQuery, (snapshot) => {
    this.messages.value = this.snapshotProcessing(snapshot);
  });

  constructor() {
    onUnmounted(this.unsubscribe);
  }

  async sendMessage(text: string): Promise<void> {
    const user = AuthService.user;
    if (!user?.value || !AuthService.isLogin.value) return;
    const { photoURL, uid, displayName, email } = user.value;
    await addDoc(collection(FirebaseService.firestore, MESSAGES_PATH), {
      userName: displayName || email,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: serverTimestamp(),
    });
  }

  private snapshotProcessing(snapshot: QuerySnapshot<Message, DocumentData>): MessageWithId[] {
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).reverse();
  }
}

export default new ChatService();
