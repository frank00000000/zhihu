import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import mitt from 'mitt'

const Mit = mitt()

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
const app = createApp(App)


// 扩展属性 mitt
declare module 'vue' {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit
    }
}


app.config.globalProperties.$Bus = Mit


app.mount('#app')