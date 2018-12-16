import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


function mountWidgets(selector: string) {
    new Vue({
        router,
        store,
        render: (h) => h(App),
    }).$mount('#app');
}

export default mountWidgets; 
