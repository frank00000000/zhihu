import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import mitt from 'mitt'
const Mit = mitt()

// 导入路由
import router from '@/router'
import '@/index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
const app = createApp(App)
app.use(router)
// 扩展属性 mitt,router

declare module 'vue' {
    export interface ComponentCustomProperties{
        $Bus: typeof Mit
    }
}
app.config.globalProperties.$Bus = Mit
app.mount('#app')