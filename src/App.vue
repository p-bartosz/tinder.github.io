<template>
  <div>
    <Nav class="nav-bar" />
    <div class="main-content">
      <RouterView/>
    </div>
  </div>
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

<style scoped lang="scss">
@import "libs/styles/responsiveness.scss"; 

.main-content {
  margin: var(--nav-bar-height) auto calc(var(--footer-height) + 20px) auto;
  padding: 10px;

  @include min-tablet {
    width: 768px;
  }

  @include min-mini-desktop {
    width: 990px;
  }
}
</style>
