<template>
  <Loading :active="isLoading"></Loading>
  <div class="container userArticles">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/user/index">首頁</router-link>
        </li>
        <li class="breadcrumb-item active">
          最新消息
        </li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <div class="col-md-10"
        v-for="(item, i) in articles" :key="item.id">
        <div class="card bg-transparent w-100 py-5"
          :class="{ 'articles-border': i+1 !== articlesLength }">
          <div class="row g-0" style="cursor: pointer;"
            @click="gotoArticle(item.id)">
            <div class="col-md-4 position-relative">
              <div class="img-frame h-100 w-100"></div>
              <img :src="item.image" alt="..."
                class="w-100 h-100 object-fit-cover"
                style="min-height: 200px;">
            </div>
            <div class="col-md-8">
              <div class="card-body pt-4 pt-md-3 pb-0 pb-md-3 px-md-5
                h-100 d-flex flex-column">
                <h5 class="card-title">{{ item.title }}</h5>
                <p class="card-text">
                  <small class="text-muted">#{{ item.tag }}</small>
                </p>
                <p class="card-text content">
                  {{ item.content }}
                </p>
                <div class="mt-auto ms-auto more">
                  <div class="mb-0">
                    more
                    <i class="fa-solid fa-caret-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pagination="pagination"
      @update-page="getArticles">
    </Pagination>
  </div>
</template>

<script>
import fullpathMixin from '@/mixins/fullpathMixin';
import Pagination from '@/components/Pagination.vue';

export default {
  mixins: [fullpathMixin],
  components: {
    Pagination,
  },
  data() {
    return {
      isLoading: false,
      pagination: {},
      articles: {},
      articlesLength: '',
    };
  },
  methods: {
    getArticles(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
          this.articlesLength = this.articles.length;
          this.articles.forEach((item, i) => {
            this.getArticle(item, i);
          });
        });
    },
    getArticle(item, i) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${item.id}`;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.articles[i].content = res.data.article.content;
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
