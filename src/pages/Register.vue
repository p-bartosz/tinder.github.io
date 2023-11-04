<template>
  <h2>Register</h2>
  <form class="form" @submit.prevent="register">
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
    <button type="submit">Register</button>
  </form>
</template>

<script lang="ts">
import AuthService from '@/firebase/AuthService';
import { UserCredential } from '@firebase/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      AuthService.createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential: UserCredential) => {
          console.log('userCredential', userCredential);
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          console.log(errorCode, errorMessage);
          
        });
    },
  }
});
</script>

<style scoped lang="scss">
h2 {
  margin: 0 0 10px;
  color: #fff;
  text-align: center;
}

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
