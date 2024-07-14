<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="products-list row mb-5 g-4">
      <div class="col-12 col-md-4 col-xl-3">
        <div class="sticky-md-top" style="top:120px">
          <nav aria-label="breadcrumb" class="mb-3">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/user/index">首頁</router-link>
              </li>
              <li class="breadcrumb-item active">
                產品
              </li>
            </ol>
          </nav>
          <ProductsSidebar>
          </ProductsSidebar>
        </div>
      </div>
      <div class="col-12 col-md-8 col-xl-9">
        <div class="dropdown mb-3 text-end">
          <button class="btn btn-secondary btn-sm dropdown-toggle rounded-0"
            id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            排序
          </button>
          <ul class="dropdown-menu rounded-0" aria-labelledby="dropdownMenuLink">
            <li>
              <button class="dropdown-item" @click="sort('low')">
                價錢低到高
              </button>
            </li>
            <li>
              <button class="dropdown-item" @click="sort('high')">
                價錢高到低
              </button>
            </li>
          </ul>
        </div>
        <div class="row mb-5 gx-3 gy-4 g-sm-5 gy-sm-4
          justify-content-bewtween ">
          <div class="col-6 col-xl-4"
            v-for="item in this.newData[pagination.current_page -1]"
            :key="item.id">
            <div class="card product-card mx-auto h-100"
              @click.stop="getProduct(item.id)" @keydown="getProduct(item.id)">
              <div class="overflow-hidden position-relative">
                <div class="more-text text-dark text-center bg-secondary py-1
                  position-absolute bottom-0">
                  查看更多
                </div>
                <span class="sale badge bg-pink position-absolute text-white top-0 end-0
                  rounded-0 fs-6"
                  v-if="item.origin_price != item.price">
                  sale
                </span>
                <img :src="item.imageUrl" class="card-img-top object-fit-cover w-100"
                  alt="...">
              </div>
              <div class="card-body">
                <span @click.stop="setFav(item)">
                  <i :class="favState(item)">
                  </i>
                </span>
                <p class="fs-14 mb-1">#{{ item.category }}</p>
                <h5 class="card-title">{{ item.title }}</h5>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="price fw-semibold mb-0 text-pink" v-if="item.price">
                    NT${{ item.price }}
                  </p>
                  <p class="price fw-semibold mb-0 text-pink" v-else>
                    NT${{ item.origin_price }}
                  </p>
                  <del v-if="item.origin_price != item.price">
                    NT${{ item.origin_price }}
                  </del>
                </div>
              </div>
              <div class="card-foot p-0">
                <button class="btn btn-sm w-100 btn-info rounded-0 py-2"
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
              </div>
            </div>
          </div>
        </div>
        <Pagination :pagination="pagination"
          @update-page="getPages"></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import ProductsSidebar from '@/components/ProductsSidebar.vue';
import fullpathMixin from '@/mixins/fullpathMixin';
import getCartMixin from '@/mixins/getCartMixin';
import favMixin from '@/mixins/favMixin';
import Dropdown from 'bootstrap/js/dist/dropdown';

export default {
  mixins: [fullpathMixin, getCartMixin, favMixin],
  components: {
    Pagination,
    ProductsSidebar,
  },
  data() {
    return {
      products: [],
      pagination: {},
      ProductsArr: [],
      isLoading: false,
      renderProducts: [],
      couponCode: '',
      newData: [],
      dropdownList: {},
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.pagination.category = this.$route.query.category || '全部';
          this.products.forEach((item) => {
            this.ProductsArr.push(item);
          });
          this.renderCategory(page);
          this.renderProducts = this.ProductsArr;
        });
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
    updateCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${this.productClicked.id}`;
      const cart = {
        product_id: this.productClicked.product_id,
        qty: 20,
      };
      this.$http.put(url, { data: cart })
        .then(() => {
          this.getCart();
        });
    },
    renderCategory(page) {
      if (page < this.pagination.total_pages) {
        this.getProducts(page + 1);
      } else {
        if (this.pagination.category !== '全部'
        && this.renderProducts.length === this.ProductsArr.length) {
          this.renderProducts = this.ProductsArr.filter((item) => (
            item.category === this.pagination.category
          ));
        }
        this.newData = [];
        this.renderProducts.forEach((item, i) => {
          if (i % 10 === 0) {
            this.newData.push([]);
          }
          const pagenum = parseInt(i / 10, 10);
          this.newData[pagenum].push(item);
        });
        this.isLoading = false;
        this.pagination.current_page = 1;
        this.pagination.total_pages = this.newData.length;
      }
    },
    getPages(page) {
      this.pagination.current_page = page;
    },
    sort(price) {
      if (price === 'low') {
        this.renderProducts.sort((a, b) => a.price - b.price);
      } else {
        this.renderProducts.sort((a, b) => b.price - a.price);
      }
      this.renderCategory();
    },
  },
  created() {
    // localStorage.clear();
    this.getProducts();
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    this.dropdownList = dropdownElementList.map((dropdownToggleEl) => (
      new Dropdown(dropdownToggleEl)
    ));
  },
};
</script>
