import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as log from 'loglevel';

log.setLevel(log.levels.INFO);

import './assets/variables.less';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
