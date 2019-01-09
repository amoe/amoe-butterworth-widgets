import Vue from 'vue';
import WidgetView from './components/WidgetView.vue';
import WidgetsModule from '@/vuex-module';

export interface WidgetViewComponent {
    getQuery(): any;
}

export { WidgetView, WidgetsModule }
