<template>
  <div class="view-height" @click="toggleNav">
    <UserNavbar ref="UserNavbar"></UserNavbar>
    <div class="user-view">
      <router-view :key="this.$route.fullPath">
      </router-view>
    </div>
    <Footer></Footer>
    <ToastMessages></ToastMessages>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';
import UserNavbar from '@/components/UserNavbar.vue';
import Footer from '@/components/Footer.vue';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: {
    UserNavbar,
    Footer,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
  methods: {
    toggleNav(e) {
      if (e.target.dataset.name !== 'nav') {
        this.$refs.UserNavbar.hideNav();
      }
    },
  },
};
</script>
