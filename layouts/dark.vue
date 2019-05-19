<template>
  <div 
    :class="{'isSidebarOpen': getSidebarStatus}" 
    class="isDark">
    <app-sidebar />
    <keep-alive>
      <nuxt class="page-content" />
    </keep-alive>
  </div>
</template>

<script>
import AppSidebar from '~/components/Sidebar.vue'
import { mapGetters } from 'vuex';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';


export default {
  components: {
    AppSidebar
  },
  computed: {
    ...mapGetters([
      'getSidebarStatus'
    ]),
    scrollBarOptions(){
      return {
        reserveScrollBarGap: true
      }
    }
  },
  watch: {
    getSidebarStatus(value) {
      if (value) {
        disableBodyScroll(document.querySelector('body'), this.scrollBarOptions);
        return false;
      }
      clearAllBodyScrollLocks();
    }
  },
}
</script>

<style lang="scss"></style>


