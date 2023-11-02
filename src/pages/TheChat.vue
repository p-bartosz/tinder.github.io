<template>
  <div class="container-sm mt-20">
    <div class="mx-5">
      <TheMessage
        v-for="{ id, text, userPhotoURL, userName, userId } in messages"
        :key="id"
        :name="userName"
        :photo-url="userPhotoURL"
        :sender="userId === user?.uid"
      >
        {{ text }}
      </TheMessage>
    </div>
  </div>

  <div ref="bottom" class="mt-20" />

  <div class="bottom">
    <div class="container-sm">
      <form v-if="isLogin" @submit.prevent="send">
        <input v-model="message" placeholder="Message" required />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, nextTick, defineComponent } from "vue";
import ChatService from "../firebase/ChatService";
import AuthService from "../firebase/AuthService";

import SendIcon from "../components/SendIcon.vue";
import TheMessage from "../components/TheMessage.vue";

export default defineComponent({
  components: { TheMessage, SendIcon },
  setup() {
    const messages = ChatService.messages;
    const sendMessage = ChatService.sendMessage;

    const bottom = ref(null);
    watch(
      messages,
      () => {
        nextTick(() => {
          // bottom.value?.scrollIntoView({ behavior: "smooth" });
        });
      },
      { deep: true }
    );

    const message = ref("");
    const send = () => {
      sendMessage(message.value);
      message.value = "";
    };

    return { user: AuthService.user, isLogin: AuthService.isLogin, messages, bottom, message, send };
  },
});
</script>

<style scoped lang="scss">
.container-sm {
  max-width: 36rem;
  width: 100%;
  margin-right: auto;
  margin-left: auto;

  margin-top: 5rem;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

.bottom {
  position: fixed;
  bottom: 0;
  --tw-bg-opacity: 1;
  background-color: rgba(17,24,39,var(--tw-bg-opacity));
  --tw-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);
  box-shadow: var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow);
  width: 100%;

  form {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  input {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    --tw-text-opacity: 1;
    flex-grow: 1;
    margin: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-right: 0.25rem;
    border-radius: 0.25rem;
    border-style: none;
    --tw-bg-opacity: 1;
    background-color: rgba(55,65,81,var(--tw-bg-opacity));
    color: rgba(255,255,255,var(--tw-text-opacity));
  }
}
</style>
