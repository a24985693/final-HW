<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <button class="btn btn-secondary"
      @click.prevent="openModal(true)">新增優惠券
    </button>
  </div>
  <div class="table-responsive">
    <table class="table text-nowrap">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-gray btn-sm"
                @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm"
                @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CouponModal ref="CouponModal" :coupon="tempCoupon"
    @update-coupon="updateCoupon"></CouponModal>
  <DelCouponModal ref="DelCouponModal" :coupon="tempCoupon"
    @delete-coupon="deleteCoupon"></DelCouponModal>
  <Pagination :pagination="pagination"
    @update-page="getCoupons"></Pagination>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue';
import DelCouponModal from '@/components/DelCouponModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    CouponModal,
    DelCouponModal,
    Pagination,
  },
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
      isNew: false,
      isLoading: false,
    };
  },
  inject: ['emitter'],
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
        });
    },
    openModal(isNew, item) {
      this.isNew = isNew;
      if (!isNew) {
        this.tempCoupon = { ...item };
      } else {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      }
      this.$refs.CouponModal.showModal();
    },
    updateCoupon(item) {
      this.isLoading = true;
      this.tempProduct = item;
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let method = 'post';
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        method = 'put';
      }
      this.$http[method](url, { data: this.tempProduct })
        .then((res) => {
          this.isLoading = false;
          this.$refs.CouponModal.hideModal();
          let messageTitle = '新增成功';
          if (!this.isNew) {
            messageTitle = '更新成功';
          }
          if (res.data.success) {
            this.getCoupons();
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
    openDelModal(item) {
      this.tempCoupon = item;
      this.$refs.DelCouponModal.showModal();
    },
    deleteCoupon(item) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
      this.$http.delete(url)
        .then((res) => {
          this.isLoading = false;
          this.$refs.DelCouponModal.hideModal();
          this.getCoupons();
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
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
