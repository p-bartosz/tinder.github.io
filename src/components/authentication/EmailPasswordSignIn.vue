<template>
  <form class="form" @submit.prevent="loginWithEmailAndPassword">
    <input
      type="email"
      placeholder="Email address..."
      v-model="email"
    />
    <input
      type="password"
      placeholder="password..."
      v-model="password"
    />
    <button type="submit">Log in</button>
  </form>
</template>

<script lang="ts">
import AuthService from "../../firebase/AuthService";
import { defineComponent } from "vue";
import { UserCredential } from "@firebase/auth";

export default defineComponent({
  name: 'EmailPasswordSignIn',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginWithEmailAndPassword() {
      AuthService.signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential: UserCredential) => {
          console.log('userCredential', userCredential);
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          console.log(errorCode, errorMessage);
          
        });
    }
  }
});
</script>

<style lang="scss">
.form {
  box-shadow: #fff 0 0 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;

  > input {
    max-width: 400px;
  }

  > button {
    margin-top: 15px;
  }
}
</style>
