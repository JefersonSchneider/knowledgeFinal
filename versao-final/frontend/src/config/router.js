import Vue from 'vue'
import VueRouter from 'vue-router'

import { userKey } from '@/global'

Vue.use(VueRouter)

const Home = () => import('@/components/home/Home.vue')
const AdminPages = () => import('@/components/admin/AdminPages.vue')
const ArticlesByCategory = () => import('@/components/article/ArticlesByCategory.vue')
const ArticleById = () => import('@/components/article/ArticleById.vue')
const Auth = () => import('@/components/auth/Auth.vue')

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router
