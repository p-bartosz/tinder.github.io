<template>
  <div class="message">
    <span v-if="!sender">{{ name }}</span>
    <div class="flex" :class="sender ? 'flex-row-reverse' : ''">
      <Avatar class="mt-1" :src="photoUrl" />
      <div class="text w-3/4" :class="sender ? 'bg-green-800' : 'bg-gray-700'">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Avatar from "./TheAvatar.vue";
export default defineComponent({
  components: { Avatar },
  props: {
    name: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    sender: { type: Boolean, default: false },
  },
});
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}

.message {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;

  span {
    margin-left: 2.75rem;
    font-size: .75rem;
    line-height: 1rem;
    --tw-text-opacity: 1;
    color: rgba(107,114,128,var(--tw-text-opacity));
  }

 .text {
    display: flex;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    --tw-text-opacity: 1;
    color: rgba(255,255,255,var(--tw-text-opacity));
    --tw-bg-opacity: 1;
    background-color: rgba(55,65,81,var(--tw-bg-opacity));
  }
}
</style>
