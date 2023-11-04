<template>
  <img class="avatar" :src="avatarSrc" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DEFAULT_AVATAR_LINK } from "@/helper/constants/links";

export default defineComponent({
  name: 'TheAvatar',
  props: {
    src: {
      type: String,
      default: DEFAULT_AVATAR_LINK
    }
  },
  computed: {
    avatarSrc() {
      return this.src || DEFAULT_AVATAR_LINK
    }
  }
});
</script>

<style scoped lang="scss">
.avatar {
  height: 2rem;
  width: 2rem;
  border-radius: 9999px;
}
</style>
