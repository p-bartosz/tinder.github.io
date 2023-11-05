<template>
  <nav>
    <div>
      <RouterLink to="/">
        <h1><strong>Vue</strong> Chat App</h1>
      </RouterLink>

      <div v-if="isLogin" class="login">
        <TheAvatar v-if="user?.photoURL" :src="user.photoURL" />
        <button class="text-gray-400 hover:text-white" @click="signOut">
          Sign Out
        </button>
      </div>

      <button v-else class="bg-green-500 hover:bg-green-600" @click="openSignInModal">
        Sign in
      </button>
    </div>
  </nav>

  <teleport to="body">
    <div v-if="modalOpen" class="dialog-backdrop" @click="closeSignInModal">
      <dialog class="modal" open @click.stop>
        <LoginForm @close-dialog="closeSignInModal"/>
      </dialog>
    </div>
  </teleport>
</template>

<script lang="ts">
import TheAvatar from "./TheAvatar.vue";
import AuthService from "../firebase/AuthService";
import LoginForm from "./sign-in-up/LoginForm.vue";
import { defineComponent } from "vue";
import { User } from "@firebase/auth";

export default defineComponent({
  name: 'TheNav',
  components: { TheAvatar, LoginForm },
  data() {
    return {
      modalOpen: false
    }
  },
  computed: {
    isLogin(): boolean {
      return AuthService.isLogin?.value;
    },
    user(): User | null {
      return AuthService.user?.value;
    },
  },
  methods: {
    openSignInModal(): void {
      this.modalOpen = true;
    },
    closeSignInModal(): void {
      this.modalOpen = false;
    },
    signOut(): void {
      AuthService.signOut();
    }
  }
});
</script>

<style scoped lang="scss">

nav {
  position: fixed;
  width: 100%;
  --tw-bg-opacity: 1;
  background-color: rgba(17,24,39,var(--tw-bg-opacity));
  --tw-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);
  box-shadow: var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow);
  top: 0;
  z-index: 20;

  > div {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    height: var(--nav-bar-height);
    padding-left: 1rem;
    padding-right: 1rem;
    margin-right: auto;
    margin-left: auto;
  }

  h1 {
    --tw-text-opacity: 1;
    color: rgba(255,255,255,var(--tw-text-opacity));
    font-size: 1.25rem;
    line-height: 1.75rem;

    > strong {
      --tw-text-opacity: 1;
      color: rgba(110,231,183,var(--tw-text-opacity));
    }
  }

  .login {
    right: 0;
    display: flex;
    margin-left: auto;
  }

  button {
    --tw-text-opacity: 1;
    color: rgba(255,255,255,var(--tw-text-opacity));
    padding: 0.25rem;
    border-radius: 0.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
    --tw-text-opacity: 1;
    color: rgba(156,163,175,var(--tw-text-opacity));
    background-color: transparent;
    background-image: none;
  }
}

dialog {
  border: none !important;
  border-radius: calc(5px * var(--ratio));
  box-shadow: 0 0 #0000, 0 0 #0000, 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.6rem;
  max-width: 400px;
  top: 50%;
  transform: translateY(-50%);
}

.dialog-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: hsla(0, 0%, 0%, .5);
  z-index: 100;
}
</style>
