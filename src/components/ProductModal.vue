<template>
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="tempProduct.id">編輯產品</span>
            <span v-else>新增產品</span>
          </h5>
          <button type="button" class="btn-close text-white"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input type="text" class="form-control" id="title"
              placeholder="請輸入標題"
              v-model="tempProduct.title">
          </div>
          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="category" class="form-label">分類</label>
              <input type="text" class="form-control" id="category"
                placeholder="請輸入分類"
                v-model="tempProduct.category">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">單位</label>
              <input type="text" class="form-control" id="unit"
                placeholder="請輸入單位"
                v-model="tempProduct.unit">
            </div>
          </div>
          <div class="row gx-2">
            <div class="mb-3 col-md-6">
              <label for="origin_price" class="form-label">原價</label>
              <input type="number" class="form-control" id="origin_price"
                placeholder="請輸入原價"
                v-model="tempProduct.origin_price">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">售價</label>
              <input type="number" class="form-control" id="price"
                placeholder="請輸入售價"
                v-model="tempProduct.price">
            </div>
          </div>
          <hr>

          <div class="mb-3">
            <label for="description" class="form-label">產品描述</label>
            <textarea type="text" class="form-control" id="description"
              placeholder="請輸入產品描述"
              v-model="tempProduct.description"></textarea>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">說明內容</label>
            <textarea type="text" class="form-control" id="content"
              placeholder="請輸入產品說明內容"
              v-model="tempProduct.content"
              style="white-space: pre;"></textarea>
          </div>
          <div class="mb-5">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                :true-value="1"
                :false-value="0"
                id="is_enabled"
                v-model="tempProduct.is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
          <hr>
          <!-- 上傳主圖片 -->
          <div class="mainImg my-5">
            <div class="mb-5">
            <label for="image" class="form-label">輸入主圖片網址</label>
            <div class="mb-3 input-group">
              <input type="text" class="form-control"
                placeholder="請輸入圖片連結" ref="inputLink">
              <button type="button" class="btn btn-secondary"
                @click="uploadLink">
                新增圖片
              </button>
            </div>
            <label for="customFile" class="form-label">或上傳主圖片
            <i class="fas fa-spinner fa-spin"></i>
            </label>
            <input type="file" id="customFile" class="form-control mb-3"
              @change="uploadFile" ref="inputFile">
            </div>
            <div class="row justify-content-center" v-if="tempProduct.imageUrl">
              <div class="col-md-6">
                <div class="ratio ratio-1x1">
                  <img class="img-fluid object-fit-cover" alt=""
                  :src="tempProduct.imageUrl">
                </div>
                <div class="mb-3 input-group">
                  <input type="url" class="form-control"
                    placeholder="請輸入連結" v-model="tempProduct.imageUrl">
                  <button type="button" class="btn btn-outline-danger"
                    @click="tempProduct.imageUrl = '';
                    console.log(tempProduct.imageUrl)">
                    移除
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <!-- 延伸技巧，多圖 -->
          <div class="subImg my-5">
            <div class="mb-5">
            <label for="image" class="form-label">輸入副圖片網址</label>
            <div class="mb-3 input-group">
              <input type="text" class="form-control"
                placeholder="請輸入副圖片連結" ref="inputSubLink">
              <button type="button" class="btn btn-secondary"
                @click="uploadSubLink">
                新增圖片
              </button>
            </div>
            <label for="customSubFile" class="form-label">或上傳副圖片
              <i class="fas fa-spinner fa-spin"></i>
            </label>
            <input type="file" id="customSubFile" class="form-control mb-3"
              @change="uploadSubFile" ref="inputSubFile">
            </div>
            <div class="row" v-if="tempProduct.images">
              <div v-for="(image, key) in tempProduct.images" :key="key"
                class="col-md-4 mb-3 ">
                <!-- 但是這裡如果使用v-model綁定item，會發現無論如何改動資料，
                  showData.imagesUrl的資料永遠是空字串 -->

                <!-- 我們使用的image 實際上是存在在 v-for 循環中的 tempProduct.images 陣列中，
                  我們的確有改動到，但是是改動到image而不是 Vue 實例的屬性。
                  Vue 的 v-for 創建了一個局部的作用域，
                  因此在這個循環內部的 image 變數僅在該循環內有效。 -->

                <!-- 為了解決這個問題，你需要將 v-model
                  綁定到 showData.imagesUrl 陣列的元素。 -->

                <!-- v-model 就會綁定到 tempProduct.images 陣列的正確元素上，
                  而不是循環內部的局部變數 image。這 -->
                <div class="ratio ratio-1x1">
                  <img class="img-fluid object-fit-cover" alt="" :src="image">
                </div>
                <div class="input-group">
                  <input type="url" class="form-control"
                    placeholder="請輸入連結" v-model="tempProduct.images[key]">
                  <button type="button" class="btn btn-outline-danger"
                    @click="tempProduct.images.splice(key, 1)">
                    移除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-gray" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-secondary"
            @click="$emit('update-product', tempProduct)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  watch: {
    product() {
      this.tempProduct = this.product;
      if (!this.tempProduct.images) {
        this.tempProduct.images = [];
      }
    },
  },
  props: {
    product: {},
  },
  data() {
    return {
      tempProduct: {
      },
    };
  },
  methods: {
    uploadFile() {
      const uploadedFile = this.$refs.inputFile.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData)
        .then((res) => {
          this.tempProduct.imageUrl = res.data.imageUrl;
        });
    },
    uploadSubFile() {
      const uploadedFile = this.$refs.inputSubFile.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData)
        .then((res) => {
          if (res.data.success) {
            this.tempProduct.images.push(res.data.imageUrl);
            this.$refs.inputSubFile.value = '';
          }
        });
    },
    uploadLink() {
      this.tempProduct.imageUrl = this.$refs.inputLink.value;
      this.$refs.inputLink.value = '';
    },
    uploadSubLink() {
      this.tempProduct.images.push(this.$refs.inputSubLink.value);
      this.$refs.inputSubLink.value = '';
    },
  },
  mixins: [modalMixin],
};
</script>
