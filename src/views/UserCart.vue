<template>
  <Loading :active="isLoading"></Loading>
  <div class="container cart">
    <div class="row align-items-center
      d-flex flex-column g-4">
      <div class="col-12 col-md-8 col-xl-7">
        <div class="row gx-3 text-center">
          <div class="col-4 border py-3 bg-info">
            <h5>step1</h5>
            <p>確認訂單</p>
          </div>
          <div class="col-4 border py-3">
            <h5>step2</h5>
            <p>填寫資料</p>
          </div>
          <div class="col-4 border py-3">
            <h5>step3</h5>
            <p>付款</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 col-xl-7">
        <h4 class="mb-3">購物車清單</h4>
        <template v-if="cartLength !== 0">
          <div class="clearfix mx-2">
            <ul v-for="item in cart.carts" :key="item.id"
              class="row bg-white list-unstyled align-items-center
              py-3 position-relative">
              <li class="col-4 col-md-3">
                <div class="product-img">
                  <img :src="item.product.imageUrl" alt=""
                    class="object-fit-cover"
                    @click="getProduct(item.product.id)">
                </div>
                <div class="delete-icon">
                  <button class="btn"
                    @click="deleteCartItem(item.id)">
                    <i class="fa-solid fa-xmark text-gray fs-3"></i>
                  </button>
                </div>
                <div class="use-coupon"
                  v-if="cart.final_total !== cart.total">
                  <p class="text-success">已套用優惠</p>
                </div>
              </li>
              <li class="col-6 col-md-9 product-content">
                <ul class="row flex-column align-items-center flex-md-row list-unstyled gy-2">
                  <li class="col col-md-5 col-xl-7 product-title">
                    <p class="mb-0 fs-6 fw-semibold">{{ item.product.title }}</p>
                    <p class="d-none d-xl-flex fs-14">{{ item.product.description }}</p>
                  </li>
                  <ul class="col col-md-7 col-xl-5 list-unstyled d-flex flex-column flex-md-row
                    align-items-start align-items-md-center justify-content-between">
                    <li class="updateNum d-flex align-items-center justify-content-center
                      mb-2 mb-md-0">
                      <button @click.prevent="updateCart(item, item.qty-1)"
                        :disabled="item.qty <= 1"
                        class="btn">
                        <i class="fa-solid fa-minus fs-5"></i>
                      </button>
                      <input type="number" class="shadow-none" v-model="item.qty"
                        min="1" max="100"
                        @change="updateCart(item, item.qty)">
                      <button @click.prevent="updateCart(item, item.qty+1);"
                        :disabled="item.qty >= 20"
                        class="btn">
                        <i class="fa-solid fa-plus fs-5"></i>
                      </button>
                    </li>
                    <li class="product-price text-end">
                      NT${{ $filters.currency(item.total) }}
                    </li>
                  </ul>
                </ul>
              </li>
            </ul>
          </div>
          <div class="row justify-content-between mb-2">
            <div class="col">
              <button class="btn btn-sm btn-outline-gray">清空購物車</button>
            </div>
            <div class="col text-end">
              <p>共 <span class="text-pink fw-bold">{{cartLength}}</span> 件商品</p>
            </div>
          </div>
          <div class="row justify-content-end mb-3">
            <ul class="col col-md-6 col-xl-5 list-unstyled">
              <li class="text-end d-flex justify-content-between mb-1">
                <p>總計</p>
                <p>{{ $filters.currency(cart.total) }}</p>
              </li>
              <li v-if="cart.final_total !== cart.total"
                class="text-end d-flex justify-content-between text-muted mb-1
                border-bottom border-dark fs-14">
                <p>已套用優惠券</p>
                <p>{{ cart.carts[0].coupon.code }}</p>
              </li>
              <li v-if="cart.final_total !== cart.total"
                class="text-end d-flex justify-content-between mb-2">
                <p>折扣價</p>
                <p>{{ $filters.currency(cart.final_total) }}</p>
              </li>
              <li>
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="請輸入優惠碼"
                    v-model="couponCode">
                  <button class="btn btn-secondary"
                    @click="addCouponCode">套用</button>
                </div>
              </li>
            </ul>
          </div>
          <div class="row justify-content-between fs-5">
            <div class="col-6">
              <a href="#" @click.prevent="returnPage"
                @keydown.prevent="returnPage"
                class="text-decoration-none">
                <i class="fa-solid fa-angle-left"></i>
                回到上頁
              </a>
            </div>
            <div class="col text-end">
              <router-link to="/user/information" class="text-decoration-none fw-bold text-pink">
                前往結帳
                <i class="fa-solid fa-angle-right"></i>
              </router-link>
            </div>
          </div>
        </template>
        <div v-if="cartLength === 0"
          class="p-5 text-center">
          <i class="fa-solid fa-cart-shopping text-gray mb-5"
            style="font-size: 120px;"></i>
          <h5 class="mb-3">購物車目前沒有商品</h5>
          <router-link to="/user/productsList" class="fw-semibold text-pink">
            繼續購物
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fullpathMixin from '@/mixins/fullpathMixin';

export default {
  data() {
    return {
      cart: {},
      cartLength: '',
      cartNum: '',
      couponCode: '',
      isLoading: false,
    };
  },
  mixins: [fullpathMixin],
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data;
          this.cartLength = this.cart.carts.length;
          this.isLoading = false;
          this.emitter.emit('get-cart', {
            cartLength: this.cartLength,
          });
        });
    },
    updateCart(item, quantity) {
      this.isLoading = true;
      if (quantity > 20) {
        this.product.qty = 20;
        this.isLoading = false;
      } else if (quantity < 1) {
        this.product.qty = 1;
        this.isLoading = false;
      } else {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
        const cart = {
          product_id: item.product_id,
          qty: quantity,
        };
        this.$http.put(url, { data: cart })
          .then(() => {
            this.getCart();
            this.isLoading = false;
          });
      }
    },
    deleteCartItem(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(url)
        .then(() => {
          this.getCart();
          this.isLoading = false;
        });
    },
    addCouponCode() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const dataCode = { code: this.couponCode };
      this.$http.post(url, { data: dataCode })
        .then(() => {
          this.getCart();
          this.couponCode = '';
          this.isLoading = false;
        });
    },
    createOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http.post(url, { data: this.form })
        .then((res) => {
          this.isLoading = false;
          this.$router.push(`/user/checkout/${res.data.orderId}`);
        });
    },
    returnPage() {
      this.$router.go(-1);
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
  },
  created() {
    this.getCart();
  },
};
</script>
