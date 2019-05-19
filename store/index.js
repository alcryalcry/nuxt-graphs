import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: {
    sidebarStatus: false
  },
  mutations: {
    toggleSidebarStatus(state){
      state.sidebarStatus = !state.sidebarStatus;
    },
    closeSidebar(state){
      if (state.sidebarStatus === true) {
        state.sidebarStatus = false;
      }
    }
  },
  getters: {
    getSidebarStatus: state => state.sidebarStatus
  }
});

export default store;