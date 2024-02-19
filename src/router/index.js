import { createRouter, createWebHistory } from 'vue-router';
import admin from './admin.js';
import frontend from './frontend.js';
const routes = [...admin, ...frontend];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;