

import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia';
import { QuillEditor } from '@vueup/vue-quill'
import { Menu, List, Drawer, Dropdown, Avatar, Button, message, Card, Table, InputNumber, Input, Form, Select, Checkbox, Upload } from 'ant-design-vue';
import App from './App.vue';
import { useRoute, useRouter } from 'vue-router';

import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'ant-design-vue/dist/reset.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
// import axios from 'axios';
import axios from 'axios';
import * as Icons from '@ant-design/icons-vue';


window.axios = axios;

axios.defaults.baseURL = import.meta.env.VITE_URL_API;
const token = localStorage.getItem("token") || "";


axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.get['Accept'] = 'application/json';
axios.defaults.headers.put['Accept'] = 'application/json';
axios.defaults.headers.delete['Accept'] = 'application/json';


const app = createApp(App)
app.component('QuillEditor', QuillEditor)
// Đăng ký tất cả các icon với Vue
Object.keys(Icons).forEach((key) => {

    app.component(key, Icons[key]);

});

app.use(useRoute);
app.use(useRouter)
app.use(router);
app.use(createPinia())
app.use(Button);
app.use(Avatar);
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