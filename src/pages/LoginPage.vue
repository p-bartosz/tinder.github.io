<template>
  <LoginForm/>
</template>

<script lang="ts">
import LoginForm from '../components/authentication/LoginForm.vue'
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    LoginForm
  }
});
</script>

<style scoped lang="scss">
h2 {
  margin: 0 0 10px;
  color: #fff;
  text-align: center;
}
</style>
