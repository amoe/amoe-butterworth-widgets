import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/types'
import widgets from '@/vuex-module';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    modules: { widgets }
};


export default new Vuex.Store(store);
