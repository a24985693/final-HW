<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row justify-content-center mb-5">
      <div class="col-12 col-md-8">
        <h4 class="mb-4">訂單查詢</h4>
        <div class="input-group">
          <input type="text" class="form-control"
          placeholder="請輸入訂單號碼" v-model="orderId">
          <button class="btn btn-secondary"
            @click="getOrder">
            查詢
            </button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center g-5"
      v-if="order.id">
      <div class="col-12 col-xl-5">
        <!-- <h5 class="mb-3">訂單明細</h5> -->
        <table class="table align-middle">
          <thead>
            <tr>
              <th scope="col">品名</th>
              <th scope="col" class="text-end">數量</th>
              <th scope="col" class="text-end">單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="row flex-column flex-md-row align-items-center">
                <div class="position-relative col w-100 w-xl-50 pt-100 pt-xl-50">
                  <img :src="item.product.imageUrl" alt=""
                    class="object-fit-cover position-absolute top-0
                    bottom-0 start-0 end-0 w-100 h-100">
                </div>
                <p class="col m-0 text-center">{{ item.product.title }}</p>
              </td>
              <td class="text-end">
                {{ item.qty }}/{{ item.product.unit }}
              </td>
              <td class="text-end">NT${{ $filters.currency(item.final_total) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr v-if="couponCode">
              <td colspan="2" class="text-end text-success">已使用優惠券</td>
              <td class="text-success text-end">{{ couponCode }}</td>
            </tr>
            <tr>
              <td colspan="2" class="text-end">總計</td>
              <td class="text-end">NT${{ $filters.currency(order.total) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="col-12 col-xl-5">
        <!-- <h4 class="mb-3">寄貨資料</h4> -->
        <table class="table mb-4">
          <tbody>
            <tr>
              <th>訂單編號</th>
              <td>{{ order.id }}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>收件人姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td v-if="!order.is_paid" class="text-danger">尚未付款</td>
              <td v-else class="text-success">付款完成</td>
            </tr>
          </tbody>
        </table>
        <div class="row flex-column flex-md-row" v-if="!order.is_paid">
          <div class="col col-md-7">
            <i class="fa-solid fa-triangle-exclamation me-2"></i>
            <span class=" fw-semibold">訂單尚未完成!</span>
            <p>確認訂單內容後，點擊付款即完成訂單!</p>
          </div>
          <div class="col col-md-5 text-end">
            <button class="btn btn-danger"
            @click="payOrder">
              確認付款
            </button>
          </div>
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
      orderId: '',
      order: {
        user: {},
      },
      couponCode: '',
      isLoading: false,
    };
  },
  mixins: [fullpathMixin],
  methods: {
    getOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          // console.log(res.data);
          this.order = res.data.order;
          const key = Object.keys(res.data.order.products)[0];
          const productKey = res.data.order.products[key];
          if (productKey.coupon) {
            this.couponCode = productKey.coupon.code;
          }
        });
    },
    payOrder() {
      this.isLoading = true;
      const id = this.orderId.trim();
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${id}`;
      this.$http.post(url)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.getOrder();
            const messageTitle = '付款成功';
            this.emitter.emit('push-message', {
              style: 'success',
              title: messageTitle,
              content: '已完成付款',
            });
          }
        });
    },
  },
};
</script>
