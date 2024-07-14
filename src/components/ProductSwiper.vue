<template>
  <swiper
    :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }"
    :spaceBetween="10"
    :navigation="true"
    :thumbs="{ swiper: thumbsSwiper }"
    :modules="modules"
    class="mySwiper2"
    ref="ThumbsSwiper"
  >
    <swiper-slide>
      <div class="ratio ratio-1x1">
        <img alt="" :src="product.imageUrl"  class="object-fit-cover"/>
      </div>
    </swiper-slide>
    <swiper-slide v-for="item in product.images" :key="item.id">
      <div class="ratio ratio-1x1">
        <img alt="" :src="item" class="object-fit-cover position-absolute
        top-0 bottom-0 start-0 end-0" />
      </div>
    </swiper-slide>
  </swiper>
  <swiper
    @swiper="setThumbsSwiper"
    :spaceBetween="10"
    :slidesPerView="4"
    :freeMode="true"
    :watchSlidesProgress="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>
      <div class="ratio ratio-1x1 object-fit-cover">
        <img alt="" :src="product.imageUrl" />
      </div>
    </swiper-slide>
    <swiper-slide v-for="item in product.images" :key="item.id">
      <div class="ratio ratio-1x1 object-fit-cover">
        <img alt="" :src="item" />
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
// import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      product: {},
      thumbsSwiper: '',
      modules: [FreeMode, Navigation, Thumbs],
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const id = this.$route.params.productId;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url)
        .then((res) => {
          this.product = res.data.product;
          this.isLoading = false;
        });
    },
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
