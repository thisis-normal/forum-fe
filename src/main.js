

import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia'
import { Menu, List, Drawer, Button, message, Card, Table } from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
// import axios from 'axios';
import axios from 'axios';
window.axios = axios;
const app = createApp(App)

app.use(router);
app.use(createPinia())
app.use(Button);
app.use(Card);
app.use(Table);
app.use(Menu);
app.use(List);
app.use(Drawer);
app.mount('#app')
app.config.globalProperties.$message = message;