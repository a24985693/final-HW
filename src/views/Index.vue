<template data-bs-spy="scroll" data-bs-target="#userNav" data-bs-offset="0">
  <header class="header position-relative vh-100"
    style="margin-top:-120px">
    <div class="blink-star position-relative h-100 w-100">
      <div class="star-1 position-absolute" style="top: 25%; left:40%">
        <div class="d-flex">
          <div class="box-1"></div>
          <div class="box-2"></div>
        </div>
        <div class="d-flex">
          <div class="box-3"></div>
          <div class="box-4"></div>
        </div>
      </div>
      <div class="star-1 position-absolute" style="top: 40%; left:70%">
        <div class="d-flex">
          <div class="box-1"></div>
          <div class="box-2"></div>
        </div>
        <div class="d-flex">
          <div class="box-3"></div>
          <div class="box-4"></div>
        </div>
      </div>
      <div class="star-2 position-absolute" style="top: 15%; left:50%">
        <div class="d-flex">
          <div class="box-1"></div>
          <div class="box-2"></div>
        </div>
        <div class="d-flex">
          <div class="box-3"></div>
          <div class="box-4"></div>
        </div>
      </div>
      <div class="star-2 position-absolute" style="top: 45%; left:20%">
        <div class="d-flex">
          <div class="box-1"></div>
          <div class="box-2"></div>
        </div>
        <div class="d-flex">
          <div class="box-3"></div>
          <div class="box-4"></div>
        </div>
      </div>
      <div class="star-3 position-absolute" style="top: 30%; left:85%">
        <div class="d-flex">
          <div class="box-1"></div>
          <div class="box-2"></div>
        </div>
        <div class="d-flex">
          <div class="box-3"></div>
          <div class="box-4"></div>
        </div>
      </div>
      <div class="star-3 position-absolute" style="top: 10%; left:15%">
        <div class="d-flex">
          <div class="box-1"></div>
          <div class="box-2"></div>
        </div>
        <div class="d-flex">
          <div class="box-3"></div>
          <div class="box-4"></div>
        </div>
      </div>
    </div>
    <div class="text-center position-absolute start-50 translate-middle" style="top: 42%;">
      <h2 class="fw-blod mb-3 text-white">在花花世界尋找屬於您的花</h2>
      <router-link class="btn btn-outline-primary rounded-0 text-dark"
        to="/user/productsList">
        開始探索
        <i class="fa-solid fa-caret-right"></i>
      </router-link>
    </div>
  </header>
  <section class="category my-5 py-5">
    <div class="container">
      <div class="row text-center g-2">
        <div class="col-12 col-md-7">
          <div class="category-top"
            data-aos="fade-up" data-aos-duration="1100">
            <div class="card bg-dark text-light border-0 mb-2">
              <img src="https://images.unsplash.com/photo-1595467959554-9ffcbf37f10f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="card-img object-fit-cover h-100" alt="...">
              <div class="card-img-overlay top-auto text-center">
                <h5 class="card-title fw-bold fs-4">捧花</h5>
                <p class="card-text">Bridal Bouquet</p>
                <button class="btn btn-info rounded-0 mx-auto">查看更多</button>
              </div>
              <router-link to="/user/productsList?category=捧花"
                class="stretched-link">
              </router-link>
            </div>
          </div>
          <div class="row g-2">
            <div class="col-md-6 category-middle">
              <div class="card bg-dark text-light border-0"
                data-aos="zoom-in" data-aos-duration="1000">
                <img src="https://images.unsplash.com/photo-1644248423441-bc7c5dcebeb6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  class="card-img object-fit-cover h-100" alt="...">
                <div class="card-img-overlay top-auto">
                  <h5 class="card-title fw-bold fs-4">花束</h5>
                  <p class="card-text">Bouquet</p>
                  <button class="btn btn-info rounded-0 mx-auto">查看更多</button>
                </div>
                <router-link to="/user/productsList?category=花束"
                  class="stretched-link">
                </router-link>
              </div>
            </div>
            <div class="col-md-6 category-middle">
              <div class="card bg-dark text-light border-0"
                data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="300">
                <img src="https://images.unsplash.com/photo-1617709862149-296a352a24ad?q=80&w=1967&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  class="card-img object-fit-cover h-100" alt="...">
                <div class="card-img-overlay top-auto">
                  <h5 class="card-title fw-bold fs-4">花瓶</h5>
                  <p class="card-text">Vase</p>
                  <button class="btn btn-info rounded-0 mx-auto">查看更多</button>
                </div>
                <router-link to="/user/productsList?category=花瓶"
                  class="stretched-link">
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-5 category-bottom">
          <div class="card bg-dark text-light border-0"
            data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <img src="https://images.unsplash.com/photo-1579101403140-c4a51e391a44?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="card-img object-fit-cover h-100" alt="...">
            <div class="card-img-overlay top-auto">
              <h5 class="card-title fw-bold fs-4">乾燥花</h5>
              <p class="card-text">Dried Flowers</p>
              <button class="btn btn-info rounded-0 mx-auto">查看更多</button>
            </div>
            <router-link to="/user/productsList?category=乾燥花"
              class="stretched-link">
            </router-link>
          </div>
        </div>
      </div>
    </div>

  </section>
  <div class="news">
    <section class="container py-5">
      <div class="row align-items-center g-4">
        <div class="col-md-3 text-center">
          <h4>News</h4>
        </div>
        <div class="col-md-9">
          <ul class="my-md-5">
            <li v-for="item in articles" :key="item.id"
              class="fw-semibold">
              <div class="d-flex flex-nowrap"
                @click="gotoArticle(item.id)"
                style="cursor: pointer;">
                <span>{{ item.tag }} | {{ item.title }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>

  <section class="container my-5 py-5 text-center">
    <h4 class="fs-2 mb-5">推薦給您</h4>
    <PreferSwiper></PreferSwiper>
  </section>
</template>

<script>
import PreferSwiper from '@/components/PreferSwiper.vue';
import fullpathMixin from '@/mixins/fullpathMixin';

export default {
  components: {
    PreferSwiper,
  },
  mixins: [fullpathMixin],
  data() {
    return {
      swiper: {},
      articles: [],
    };
  },
  methods: {
    getArticles(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.articles = res.data.articles;
        });
    },
    gotoArticle(id) {
      this.$router.push(`/user/article/${id}`);
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
