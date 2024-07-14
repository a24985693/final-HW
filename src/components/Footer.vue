<template>
  <footer class="bg-info">
    <div class="container py-5">
      <div class="row justify-content-center align-items-center g-4 mb-4 px-3">
        <div class="col-12 col-md-3 text-center">
          <img src="../assets/images/footerLogo.png" alt="" width="120px"
            class="mb-2">
          <div class="fs-4">
            <a href="#" class="link-dark">
              <i class="bi bi-line mx-2"></i>
              <span class="d-none">1</span>
            </a>
            <a href="#" class="link-dark">
              <i class="bi bi-facebook mx-2"></i>
              <span class="d-none">1</span>
            </a>
            <a href="#" class="link-dark">
              <i class="bi bi-instagram mx-2"></i>
              <span class="d-none">1</span>
            </a>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <h4 class="mb-2">關於本站</h4>
          <ul class="list-unstyled">
            <li class="mb-1">
              <router-link to="/user/productsList"
                class="text-decoration-none">
                產品列表
              </router-link>
            </li>
            <li class="mb-1">
              <router-link to="/user/articlesList"
                class="text-decoration-none">
                最新消息
              </router-link>
            </li>
            <li class="mb-1">
              <router-link to="/user/inquire"
                class="text-decoration-none">
                訂單查詢
              </router-link>
            </li>
            <li class="mb-1">
              <router-link to="/login"
                class="text-decoration-none">
                後台登入
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-6">
          <h3 class="fw-bold">想收到最新消息嗎?</h3>
          <h3 class="fw-bold mb-3">立即訂閱!</h3>
          <div class="input-group">
            <input type="text" class="form-control"
              placeholder="請輸入電子信箱">
            <button class="btn btn-secondary">訂閱</button>
          </div>
        </div>
      </div>
      <div class="text-center">
        ⓒ 2024 huahuaworld All rights reserved. 練習用無商業用途
      </div>
    </div>
  </footer>
</template>
