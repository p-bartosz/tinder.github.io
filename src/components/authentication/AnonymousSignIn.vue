<template>
  <button @click="signInAnonymously">Log In Anonimously</button>
</template>

<script lang="ts">
import AuthService from "../../firebase/AuthService";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'AnonymousSignIn',
  methods: {
    signInAnonymously(): void {
      AuthService.signInAnonymously();
    },
  }
});
</script>

<style lang="scss">
</style>
