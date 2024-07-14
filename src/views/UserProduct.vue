<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/user/index">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/user/productsList">產品</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <div class="row gy-4 mb-5 justify-content-center product-page">
      <div class="col-12 col-sm-6 product-img">
        <ProductSwiper></ProductSwiper>
      </div>
      <div class="col-12 col-sm-6">
        <h2 class="mb-2">{{ product.title }}</h2>
        <span class="sale badge bg-pink text-white mb-3 rounded-0 fs-6"
          v-if="product.origin_price != product.price">
          sale
        </span>
        <div class="mb-4">{{ product.description }}</div>
        <div class="mb-4" style="white-space: pre-line;">
          {{ product.content }}
        </div>
        <hr>
        <div class="row mb-3">
          <div class="col-8">
            <div class="h3" v-if="!product.price">NT${{ product.origin_price }}</div>
            <div class="h3" v-if="product.price">NT${{ product.price }}</div>
            <del class="h6 text-muted" v-if="product.origin_price != product.price">
              NT${{ product.origin_price }}
            </del>
          </div>
          <div class="col align-self-start text-end">
            <span
              @click.stop="setFav(product)">
              <i :class="favState(product)" class="fs-4"></i>
            </span>
          </div>
        </div>
        <div class="row flex-column mb-5 g-3">
          <div class="col-12 col-md-6">
            <div class="input-group">
              <button class="btn btn-secondary rounded-0"
                @click="updateQuantity('minus');"
                :disabled="quantity <= 1">
                -
              </button>
              <input type="number" class="form-control" v-model="quantity"
                min="1" max="20" @change="updateQuantity()"
                value=3>
              <button class="btn btn-secondary rounded-0"
                @click="updateQuantity('plus');"
                :disabled="quantity >= 20">
                +
              </button>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <button type="button" class="btn btn-info rounded-0 w-100"
              @click="addtoCart(product, quantity)"
              :disabled="product.id === this.btnLoading">
              <div class="spinner-border spinner-border-sm"
                role="status"
                v-if="btnLoading">
                <span class="visually-hidden">Loading...</span>
              </div>
              <i class="fa-solid fa-cart-shopping me-1"
                v-else></i>
              加入購物車
            </button>
          </div>
        </div>
        <div>
          <ul class="fs-14 ps-4">
            <li class="mb-3">單件商品最多購買數量為20</li>
            <li class="mb-3">消費滿NT$3,000，享免運費優惠</li>
            <li class="mb-3">客製化與急件請先與我們聯絡詢問</li>
            <li class="mb-3">提供行動支付、銀行ATM、信用卡</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <section class="container mb-5">
    <ProductTabs></ProductTabs>
  </section>
  <section class="container  text-center">
    <h4 class="mb-4">推薦商品</h4>
    <div class="row">
      <PreferSwiper></PreferSwiper>
    </div>
  </section>
</template>

<script>
import fullpathMixin from '@/mixins/fullpathMixin';
import getCartMixin from '@/mixins/getCartMixin';
import favMixin from '@/mixins/favMixin';
import ProductSwiper from '@/components/ProductSwiper.vue';
import PreferSwiper from '@/components/PreferSwiper.vue';
import ProductTabs from '@/components/ProductTabs.vue';

export default {
  components: {
    ProductSwiper,
    PreferSwiper,
    ProductTabs,
  },
  data() {
    return {
      product: {},
      quantity: 1,
      isLoading: false,
      btnLoading: false,
      bsCollapse: {},
    };
  },
  mixins: [fullpathMixin, getCartMixin, favMixin],
  methods: {
    getProduct() {
      this.isLoading = true;
      const id = this.$route.params.productId;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url)
        .then((res) => {
          this.product = res.data.product;
          this.isLoading = false;
          // console.log('getProduct:', this.product);
        });
    },
    updateQuantity(icon) {
      if (this.quantity > 20) {
        this.quantity = 20;
      } else if (this.quantity < 1) {
        this.quantity = 1;
      } else if (icon === 'minus') {
        this.quantity -= 1;
      } else if (icon === 'plus') {
        this.quantity += 1;
      }
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
