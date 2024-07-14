<template>
  <div class="toast-container position-fixed end-0 pe-3"
  style="top: 75px;">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg">
    </Toast>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast,
  },
  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style, title, content } = message;
      this.messages.push({ style, title, content });
      // console.log(this.messages);
    });
    this.emitter.on('delete-message', (message) => {
      const { style, title, content } = message;
      this.messages.push({ style, title, content });
      // console.log(this.messages);
    });
  },
};
</script>
