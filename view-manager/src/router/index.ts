import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/column/:id',
        name: 'column',
        component: () => import('../views/ColumnDetail.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router