<template>
  <Nav />
  <RouterView/>
</template>

<script lang="ts">
import Nav from "./components/TheNav.vue";
import Chat from "./pages/TheChat.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: { Nav, Chat },
});
</script>
