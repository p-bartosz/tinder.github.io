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
  UserCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import './FirebaseService'
import router from "@/router";

class AuthService {
  private auth: Auth = getAuth();
  user: Ref<User | null> = ref<User | null>(null);
  private unsubscribe = onAuthStateChanged(this.auth, (_user) => {
    this.user.value = _user;
    const currentRoute = router.currentRoute.value;
    router.push('/').then(() => {
      router.push(currentRoute);
    });
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
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
  }
}

export default new AuthService();
