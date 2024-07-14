<template>
  <div class="list-group list-group-flush" ref="list" @click="updateLink">
    <button class="list-group-item list-group-item-action"
    :class="{ active: tempCategory === '全部' }">全部
    </button>
    <button class="list-group-item list-group-item-action"
      :class="{ active: tempCategory === '花束' }">花束
    </button>
    <button class="list-group-item list-group-item-action"
      :class="{ active: tempCategory === '花瓶' }">花瓶
    </button>
    <button class="list-group-item list-group-item-action"
      :class="{ active: tempCategory === '捧花' }">捧花
    </button>
    <button class="list-group-item list-group-item-action"
      :class="{ active: tempCategory === '乾燥花' }">乾燥花
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tempCategory: '全部',
    };
  },
  methods: {
    updateLink(e) {
      const target = e.target.textContent.trim();
      this.tempCategory = target;
      this.$router.push({
        name: 'productsList',
        query: {
          category: target,
          // 到 B 頁面時再藉由這個分類名稱篩選出該分類的商品
        },
      });
    },
  },
  created() {
    this.tempCategory = this.$route.query.category || '全部';
  },
};
</script>
