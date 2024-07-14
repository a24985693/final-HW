export default {
  data() {
    return {
      favorited: JSON.parse(localStorage.getItem('favorite')) || [],
    };
  },
  methods: {
    setFav(product) {
      // console.log('click', product);
      if (this.favorited.length) {
        const array = [];
        this.favorited.forEach((item) => {
          array.push(item.id);
        });
        if (array.includes(product.id)) {
          this.favorited.splice(array.indexOf(product.id), 1);
        } else {
          this.favorited.push(product);
        }
      } else {
        this.favorited.push(product);
      }
      localStorage.setItem('favorite', JSON.stringify(this.favorited));
      this.emitter.emit('get-like', {
        favorited: this.favorited,
      });
    },
    favState(product) {
      const array = [];
      this.favorited.forEach((item) => {
        array.push(item.id);
      });
      if (array.includes(product.id)) {
        return 'fa-solid fa-heart';
      }
      return 'fa-regular fa-heart';
    },
    created() {
      this.emitter.emit('get-like', {
        favorited: this.favorited,
      });
    },
  },
};
