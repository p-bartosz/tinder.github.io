<template>
  <nav>
    <div>
      <h1><strong>Vue</strong> Chat App</h1>

      <div v-if="isLogin" class="login">
        <TheAvatar v-if="user?.photoURL" :src="user.photoURL" />
        <button class="text-gray-400 hover:text-white" @click="signOut">
          Sign Out
        </button>
      </div>

      <button v-else class="bg-green-500 hover:bg-green-600" @click="signIn">
        Sign in
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import TheAvatar from "./TheAvatar.vue";
import AuthService from "../firebase/AuthService";
import { defineComponent } from "vue";
import { User } from "@firebase/auth";

export default defineComponent({
  name: 'TheNav',
  components: { TheAvatar: TheAvatar },
  computed: {
    isLogin(): boolean {
      return AuthService.isLogin?.value;
    },
    user(): User | null {
      return AuthService.user?.value;
    },
  },
  methods: {
    signIn(): void {
      AuthService.signIn();
    },
    signOut(): void {
      AuthService.signOut();
    }
  }
});
</script>

<style lang="scss">

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
</style>
