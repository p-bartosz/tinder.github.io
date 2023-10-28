<template>
  <img class="avatar" :src="src" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: { src: { type: String, default: "" } },
});
</script>

<style lang="scss">
.avatar {
  height: 2rem;
  width: 2rem;
  border-radius: 9999px;
}
</style>
