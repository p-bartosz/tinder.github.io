<template>
  <div class="dropdown">
    <button class="dropbtn">Dropdown</button>
    <div class="dropdown-content">
      <RouterLink v-for="ROUTE of ROUTES" :to="ROUTE.path">{{ ROUTE.name }}</RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import TheAvatar from "./TheAvatar.vue";
import AuthService from "../firebase/AuthService";
import LoginForm from "./authentication/LoginForm.vue";
import { defineComponent } from "vue";
import { User } from "@firebase/auth";
import { ROUTS } from "@/router/routs";

const ROUTES = [
  {
    name: 'Home',
    path: ROUTS.MAIN
  },
  {
    name: 'Map',
    path: ROUTS.MAP
  },
  {
    name: 'Contact',
    path: ROUTS.LOGIN
  },
  {
    name: 'Sign in',
    path: ROUTS.REGISTER
  }
];

export default defineComponent({
  name: 'TheNavigation',
  components: { TheAvatar, LoginForm },
  data() {
    return {
      modalOpen: false,
      ROUTES
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
.dropbtn {
  background-color: var(--color-button);
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;

  &:hover {
    .dropdown-content {
      display: block;
    }

    .dropbtn {
      background-color: #3e8e41;
    }
  }
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;

    &:hover {
      background-color: #ddd;
    }
  }
}

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
