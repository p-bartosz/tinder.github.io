<template>
  <Nav />
  <Chat />
</template>

<script lang="ts">
import Nav from "./components/TheNav.vue";
import Chat from "./components/TheChat.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: { Nav, Chat },
});
</script>
