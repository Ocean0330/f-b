import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: "/home",
        name: "home",
        component: () => import('../pages/home/home.vue'),
    },
    {
        path: "/about",
        name: "about",
        component: () => import('../pages/about/about.vue'),
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
