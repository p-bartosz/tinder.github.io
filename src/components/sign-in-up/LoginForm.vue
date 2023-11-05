<template>
  <h2>Login</h2>
  <EmailPasswordSignIn/>
  <p>
    <router-link to="/register" @click="$emit('closeDialog')">
      Sign up
    </router-link>
    if you don't have an account
  </p>
  <GoogleSignIn/>
</template>

<script lang="ts">
import EmailPasswordSignIn from "./EmailPasswordSignIn.vue";
import GoogleSignIn from "./GoogleSignIn.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'LoginForm',
  components: {
    EmailPasswordSignIn,
    GoogleSignIn
  },
  emits: ['closeDialog']
});
</script>

<style lang="scss">
h2 {
  margin: 0 0 10px;
  color: #666;
  text-align: center;
}

p {
  color: #666;
}
</style>
