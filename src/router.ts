import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Demo1 from './views/Demo1.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            component: () => import('./views/About.vue'),
        },
        {
            path: '/demo1',
            name: 'demo1',
            component: () => import('./views/Demo1.vue')
        }
    ],
});
