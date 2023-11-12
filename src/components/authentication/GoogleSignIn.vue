<template>
  <button @click="signInWithGmail">Sign in with Google</button>
</template>

<script lang="ts">
import AuthService from "../../firebase/AuthService";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'GoogleSignIn',
  methods: {
    signInWithGmail(): void {
      AuthService.signInWithGoogle();
    },
  }
});
</script>

<style lang="scss">
</style>
