<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-transport fixed-top nav-transition"
   :class="{ navAnimated: scrollNum || (fullPath != '/user/index')}"
   data-name="nav">
    <div class="container" data-name="nav">
      <router-link class="navbar-brand nav-item" to="/user/index" data-name="nav">
        <img src="../assets/images/navLogo.png" alt="" width="30px">
        花花世界</router-link>
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation" ref="navToggleBtn" data-name="nav">
        <span class="navbar-toggler-icon" data-name="nav"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item mx-1">
            <router-link class="nav-link" to="/user/productsList" data-name="nav">
              產品列表
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <router-link class="nav-link" to="/user/articlesList" data-name="nav">
              最新消息
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <router-link class="nav-link" to="/user/inquire" data-name="nav">
              訂單查詢
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <router-link class="nav-link position-relative" data-name="nav"
              to="/user/favorite">
              <i class="fa-solid fa-heart fs-4"></i>
              <span class="icon-num bg-info text-dark rounded-circle position-absolute
                d-inline-block text-center fw-bold"
              style=" ">
                {{ favLength }}
              </span>
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <router-link class="nav-link position-relative" data-name="nav"
            to="/user/cart">
              <i class="fa-solid fa-cart-shopping fs-4"></i>
              <span class="icon-num bg-info text-dark rounded-circle position-absolute
                d-inline-block text-center fw-bold">
                {{ cartLength }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse';

export default {
  data() {
    return {
      scrollNum: '',
      fullPath: '',
      favLength: '',
      cartLength: '',
      bsCollapse: {},
    };
  },
  inject: ['emitter'],
  methods: {
    animated() {
      this.scrollNum = window.scrollY;
    },
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data;
          this.cartLength = this.cart.carts.length;
        });
    },
    getFavNum() {
      // console.log(localStorage.getItem('favorite'));
      if (localStorage.getItem('favorite')) {
        const favObj = localStorage.getItem('favorite');
        this.favLength = JSON.parse(favObj).length;
      }
    },
    hideNav() {
      this.bsCollapse.hide();
    },
  },
  created() {
    window.addEventListener('scroll', this.animated);
    this.fullPath = this.$route.fullPath;
    this.emitter.on('get-path', (item) => {
      this.fullPath = item.fullPath;
    });
    this.emitter.on('get-like', (item) => {
      const { favorited } = item;
      this.favLength = favorited.length;
    });
    this.emitter.on('get-cart', (item) => {
      this.cartLength = item.cartLength;
    });
    this.getCart();
    this.getFavNum();
  },
  mounted() {
    const dataToggle = document.querySelectorAll('.nav-item');
    const myCollapse = document.getElementById('navbarNav');
    this.bsCollapse = new Collapse(myCollapse, {
      toggle: false,
    });
    dataToggle.forEach((item) => {
      item.addEventListener('click', () => {
        this.bsCollapse.hide();
      });
    });
  },
};
</script>
