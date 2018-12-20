import Vue from 'vue';
import WidgetView from './components/WidgetView.vue';
import router from './router';
import store from './store';

function mountWidgets(selector: string) {
    const vm = new Vue({
        router,
        store,
        render: (h) => h(WidgetView),
    }).$mount(selector);

    return vm;
}

export default mountWidgets; 
