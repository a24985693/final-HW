export default {
  data() {
    return {
      cart: {},
      cartLength: '',
      cartNum: '',
      productClicked: '',
      btnLoading: '',
    };
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data;
          // console.log(this.cart);
          this.cartLength = this.cart.carts.length;
          this.emitter.emit('get-cart', {
            cartLength: this.cartLength,
          });
        });
    },
    addtoCart(item, quantity = 1) {
      this.productClicked = this.cart.carts.find((i) => i.product_id === item.id);
      this.btnLoading = item.id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: item.id,
        qty: quantity,
      };
      this.$http.post(url, { data: cart })
        .then((res) => {
          const { title } = res.data.data.product;
          this.btnLoading = '';
          this.getCart();
          if (res.data.data.qty > 20) {
            const messageTitle = '已加入到最大數量';
            this.emitter.emit('push-message', {
              style: 'warning',
              title: messageTitle,
              content: `購物車內目前已有20件${title}`,
            });
            this.updateCart();
          } else {
            const messageTitle = '加入成功';
            this.emitter.emit('push-message', {
              style: 'success',
              title: messageTitle,
              content: `已將${title}加入購物車`,
            });
          }
        });
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
  },
  created() {
    this.getCart();
  },
};
