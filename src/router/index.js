import { createRouter, createWebHistory } from 'vue-router';
import admin from './admin.js';
import frontend from './frontend.js';
import login from './login.js';
const routes = [...admin, ...frontend, ...login];
const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin') && !sessionStorage.getItem('hasVisitedAdmin')) {
    sessionStorage.setItem('hasVisitedAdmin', 'true');
    next('admin/login');
  } else {
    next();
  }
});
export default router;