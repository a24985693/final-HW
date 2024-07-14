<template>
  <Loading :active="isLoading"></Loading>
  <div class="container cart">
    <template v-if="favorited.length">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">
          <h4 class="mb-5">我的收藏</h4>
          <div class="clearfix mx-2">
            <ul v-for="item in favorited" :key="item.id"
              class="row bg-white list-unstyled align-items-center
              py-3 position-relative">
              <li class="col-4 col-md-3">
                <div class="product-img">
                  <img :src="item.imageUrl" alt=""
                    class="object-fit-cover"
                    @click="getProduct(item.id)">
                  <span class="sale badge bg-pink position-absolute text-white top-0 end-0
                    rounded-0 fs-6"
                    v-if="item.origin_price != item.price">
                    sale
                  </span>
                </div>
                <div class="delete-icon">
                  <button class="btn"
                    @click="delFav(item)">
                    <i class="fa-solid fa-xmark text-gray fs-3"></i>
                  </button>
                </div>
              </li>
              <li class="col-6 col-md-9 product-content">
                <ul class="row flex-column flex-md-row list-unstyled
                  align-items-center gy-2">
                  <li class="col col-md-4 col-xl-6 product-title">
                    <p class="mb-0 fs-6 fw-semibold">{{ item.title }}</p>
                    <p class="d-none d-xl-flex fs-14">{{ item.description }}</p>
                  </li>
                  <ul class="col col-md-3 col-xl-2 list-unstyled d-flex flex-column flex-md-row
                    align-items-start align-items-md-center justify-content-between">
                    <li class="product-price">
                      <p class="fw-semibold mb-0 text-pink" v-if="item.price">
                        NT${{ item.price }}
                      </p>
                      <p class="fw-semibold mb-0 text-pink" v-else>
                        NT${{ item.origin_price }}
                      </p>
                      <del v-if="item.origin_price != item.price">
                        NT${{ item.origin_price }}
                      </del>
                    </li>
                  </ul>
                  <li class="col col-md-5 col-xl-4">
                    <button class="btn btn-sm btn-info w-100 rounded-0 py-1"
                      @click.stop="addtoCart(item)"
                      :disabled="item.id === this.btnLoading" >
                      <div class="spinner-border spinner-border-sm"
                        role="status"
                        v-if="item.id === this.btnLoading">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      <i class="fa-solid fa-cart-shopping me-1"
                        v-else></i>
                      加入購物車
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="row justify-content-between mb-2">
            <div class="col">
              <button class="btn btn-sm btn-outline-gray"
                @click="clearFav">
                清空收藏
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-xl-7">
          <h4 class="mb-5">我的收藏</h4>
          <div class="text-center p-5">
            <i class="fa-solid fa-heart text-gray mb-5 d-block"
              style="font-size: 120px;"></i>
            <h5 class="mb-3">我的收藏目前沒有商品</h5>
            <router-link to="/user/productsList" class="fw-semibold text-pink">
              繼續挑選
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import fullpathMixin from '@/mixins/fullpathMixin';
import getCartMixin from '@/mixins/getCartMixin';
import favMixin from '@/mixins/favMixin';

export default {
  data() {
    return {
      isLoading: false,
      products: {},
      favObj: [],
      totalPages: '',
      curentPageSum: 1,
      pageSum: 1,
    };
  },
  mixins: [fullpathMixin, getCartMixin, favMixin],
  methods: {
    delFav(product) {
      const array = [];
      this.favorited.forEach((item) => {
        array.push(item.id);
      });
      this.favorited.splice(array.indexOf(product.id), 1);
      localStorage.setItem('favorite', JSON.stringify(this.favorited));
      this.getFavObj();
      this.emitter.emit('get-like', {
        favorited: this.favorited,
      });
      const messageTitle = '已移除收藏';
      this.emitter.emit('push-message', {
        style: 'danger',
        title: messageTitle,
        content: `已將${product.title}移除收藏`,
      });
    },
    clearFav() {
      this.favorited = [];
      localStorage.setItem('favorite', JSON.stringify(this.favorited));
      this.getFavObj();
      this.emitter.emit('get-like', {
        favorited: this.favorited,
      });
      const messageTitle = '已移除收藏';
      this.emitter.emit('push-message', {
        style: 'danger',
        title: messageTitle,
        content: '已將全部商品移除收藏',
      });
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
  },
};
</script>
