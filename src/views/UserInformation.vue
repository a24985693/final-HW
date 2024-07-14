<template>
  <div class="container">
    <div class="row align-items-center flex-column g-5">
      <div class="col col-md-8 col-xl-7">
        <div class="row gx-3 text-center">
          <div class="col-4 border py-3">
            <h5>step1</h5>
            <p class="m-0">確認訂單</p>
          </div>
          <div class="col-4 border py-3 bg-info">
            <h5>step2</h5>
            <p class="m-0">填寫資料</p>
          </div>
          <div class="col-4 border py-3">
            <h5>step3</h5>
            <p class="m-0">付款</p>
          </div>
        </div>
      </div>
      <div class="col col-md-8 col-xl-7">
        <h4 class="mb-3">訂單資料</h4>
        <Form v-slot="{ errors }">
          <div class="mb-3">
            <label for="inputEmail" class="form-label">Email</label>
            <Field type="email" class="form-control" id="inputEmail"
              :class="{ 'is-invalid': errors['email'] }"
              rules="email|required" name="email"
              placeholder="請輸入Email"
              v-model="form.user.email"></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="inputName" class="form-label">收件人姓名</label>
            <Field type=" text" class="form-control" id="inputName"
              :class="{ 'is-invalid': errors['姓名'] }"
              rules="required" name="姓名"
              placeholder="請輸入姓名"
              v-model="form.user.name"></Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="inputPhone" class="form-label">收件人電話</label>
            <Field type="tel" class="form-control" id="inputPhone"
              :class="{ 'is-invalid': errors['電話'] }"
              rules="required" name="電話"
              placeholder="請輸入電話"
              v-model="form.user.tel"></Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="inputAddress" class="form-label">收件人地址</label>
            <Field type="text" class="form-control" id="inputAddress"
              :class="{ 'is-invalid': errors['地址'] }"
              rules="required" name="地址"
              placeholder="請輸入地址"
              v-model="form.user.address"></Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-4">
            <label for="inputComment" class="form-label">留言</label>
            <textarea type="email" class="form-control" id="inputComment"
              v-model="form.message"></textarea>
          </div>
        </Form>
        <div class="row align-items-center">
          <div class="col">
            <router-link to="/user/cart"
              class="fw-semibold link-gray">
              回上一步
            </router-link>
          </div>
          <div class="col">
            <div class="text-end">
              <button class="btn btn-secondary"
                @click="confirm">送出表單
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fullpathMixin from '@/mixins/fullpathMixin';
import Swal from 'sweetalert2';

export default {
  mixins: [fullpathMixin],
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    createOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http.post(url, { data: this.form })
        .then((res) => {
          // console.log(res.data);
          if (res.data.success) {
            this.$router.push(`/user/checkout/${res.data.orderId}`);
          } else {
            Swal.fire({
              title: '資料有誤',
              text: '請重新確認資料!',
              icon: 'error',
              confirmButtonText: '確定',
              cancelButtonText: '取消',
              showCancelButton: true,
            });
          }
        });
    },
    confirm() {
      Swal.fire({
        title: '確定表單資料',
        text: '表單送出後將不能修改訂單!',
        icon: 'warning',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          this.createOrder();
        }
      });
    },
  },
};
</script>
