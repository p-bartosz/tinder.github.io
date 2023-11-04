import { ref, onUnmounted, computed, Ref, ComputedRef } from "vue";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
  Auth,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  UserCredential,
} from "firebase/auth";
import './FirebaseService'

class AuthService {
  private auth: Auth = getAuth();
  user: Ref<User | null> = ref<User | null>(null);
  private unsubscribe = onAuthStateChanged(this.auth, (_user) => {
    this.user.value = _user;
    console.log("_user", _user);
  });

  constructor() {
    onUnmounted(this.unsubscribe);
  }

  get isLogin(): ComputedRef<boolean> {
    return computed(() => this.user.value !== null);
  }

  async signIn(): Promise<void> {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, googleProvider);
  }

  async createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
    // const emailProvider = new EmailAuthProvider();
    // await signInWithPopup(this.auth, emailProvider);
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
  }
}

export default new AuthService();
