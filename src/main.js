

import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia';
import { QuillEditor } from '@vueup/vue-quill'
import { Menu, List, Drawer, Dropdown, Button, message, Card, Table, InputNumber, Input, Form, Select, Checkbox, Upload } from 'ant-design-vue';
import App from './App.vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'ant-design-vue/dist/reset.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
// import axios from 'axios';
import axios from 'axios';
window.axios = axios;
const app = createApp(App)
app.component('QuillEditor', QuillEditor)
app.use(router);
app.use(createPinia())
app.use(Button);
app.use(Select);
app.use(Card);
app.use(Input);
app.use(InputNumber)
app.use(Table);
app.use(Menu);
app.use(List);
app.use(Dropdown);
app.use(Checkbox);
app.use(Upload)
app.use(Drawer);
app.use(Form);
app.mount('#app')
app.config.globalProperties.$message = message;