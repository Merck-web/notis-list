import {
    createRouter,
    createWebHistory,
} from 'vue-router';
import MainPage from '@/page/MainPage.vue';

const routes = [
    {
        path: '/',
        name: 'main-page',
        component: MainPage,
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
