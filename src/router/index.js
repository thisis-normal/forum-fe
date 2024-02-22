import { createRouter, createWebHistory } from 'vue-router';
import admin from './admin.js';
import frontend from './frontend.js';
import login from './login.js';
const routes = [...admin, ...frontend, ...login];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;