<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <button type="button" class="btn btn-secondary"
      @click="openModal(true)">
      新增文章
    </button>
  </div>
  <div class="table-responsive">
    <table class="table text-nowrap">
      <thead>
        <tr>
          <th>標籤</th>
          <th>標題</th>
          <th width="120">創作時間</th>
          <th width="120">作者</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articles" :key="item.id">
          <td>{{ item.tag }}</td>
          <td>{{ item.title }}</td>
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>{{ item.author }}</td>
          <td>
            <span v-if="item.isPublic" class="text-success">公開</span>
            <span v-else class="text-muted">未公開</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-gray btn-sm"
                @click="getArticle(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm"
                @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :pagination="pagination"
    @update-page="getArticles"></Pagination>
  <ArticleModal ref="ArticleModal" :article="tempArticle"
    @update-article="updateArticle"></ArticleModal>
  <DelArticleModal ref="DelArticleModal" :article="tempArticle"
    @delete-article="deleteArticle"></DelArticleModal>
</template>

<script>
import ArticleModal from '../components/ArticleModal.vue';
import DelArticleModal from '../components/DelArticleModal.vue';
import Pagination from '../components/Pagination.vue';

export default {
  components: {
    ArticleModal,
    DelArticleModal,
    Pagination,
  },
  data() {
    return {
      articles: [],
      pagination: {},
      tempArticle: {},
      isNew: false,
      isLoading: false,
    };
  },
  inject: ['emitter'],
  methods: {
    getArticles(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
        });
    },
    openModal(isNew, item) {
      this.isNew = isNew;
      if (!isNew) {
        this.tempArticle = { ...item };
      } else {
        this.tempArticle = {
          create_at: new Date().getTime() / 1000,
        };
      }
      this.$refs.ArticleModal.showModal();
    },
    getArticle(isNew, item) {
      this.isLoading = true;
      this.isNew = isNew;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.openModal(isNew, item);
          this.tempArticle.content = res.data.article.content;
        });
    },
    openDelModal(item) {
      this.tempArticle = item;
      this.$refs.DelArticleModal.showModal();
    },
    updateArticle(item) {
      this.isLoading = true;
      this.tempArticle = item;
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`;
      let method = 'post';
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
        method = 'put';
      }
      this.$http[method](url, { data: this.tempArticle })
        .then((res) => {
          this.isLoading = false;
          this.$refs.ArticleModal.hideModal();
          let messageTitle = '新增成功';
          if (!this.isNew) {
            messageTitle = '更新成功';
          }
          if (res.data.success) {
            this.getArticles();
            this.emitter.emit('push-message', {
              style: 'success',
              title: messageTitle,
            });
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: messageTitle,
              content: res.data.message.join('、'),
            });
          }
        });
    },
    deleteArticle(item) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.emitter.emit('delete-message', {
              style: 'success',
              title: '刪除成功',
            });
          } else {
            this.emitter.emit('delete-message', {
              style: 'danger',
              title: '刪除失敗',
              content: res.data.message.join('、'),
            });
          }
          this.isLoading = false;
          this.$refs.DelArticleModal.hideModal();
          this.getArticles();
        });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
