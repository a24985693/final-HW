export default {
  inject: ['emitter'],
  created() {
    this.emitter.emit('get-path', {
      fullPath: this.$route.fullPath,
    });
  },
};
