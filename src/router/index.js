import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/Products.vue'),
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/Orders.vue'),
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('../views/Coupon.vue'),
      },
      {
        path: 'articles',
        name: 'articles',
        component: () => import('../views/Articles.vue'),
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/Userboard.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/Index.vue'),
      },
      {
        path: 'productsList',
        name: 'productsList',
        component: () => import('../views/UserProducts.vue'),
      },
      {
        path: 'product/:productId',
        name: 'product',
        component: () => import('../views/UserProduct.vue'),
      },
      {
        path: 'articlesList',
        name: 'articlesList',
        component: () => import('../views/UserArticles.vue'),
      },
      {
        path: 'article/:id',
        name: 'article',
        component: () => import('../views/UserArticle.vue'),
      },
      {
        path: 'favorite',
        name: 'favorite',
        component: () => import('../views/UserFavorite.vue'),
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/UserCart.vue'),
      },
      {
        path: 'information',
        name: 'information',
        component: () => import('../views/UserInformation.vue'),
      },
      {
        path: 'checkout/:orderId',
        name: 'checkout',
        component: () => import('../views/UserCheckout.vue'),
      },
      {
        path: 'inquire',
        name: 'inquire',
        component: () => import('../views/UserInquire.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior(to) {
    // console.log(to, from, savedPosition);
    if (to.fullPath.match('user')) {
      return {
        top: 0,
      };
    }
    return {};
    // `to` 和 `from` 都是路由路径
    // `savedPosition` 如果不存在可以为 null
  },
});

export default router;
