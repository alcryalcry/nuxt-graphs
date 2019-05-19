<template>
  <div>
    <section>
      <div class="container">
        <transition 
          name="fade" 
          mode="out-in">
          <app-graphs 
            :key="currentKey" 
            @reloadComponent="currentKey++" />
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import AppGraphs from '~/components/Graphs.vue';

export default {
  name: 'PageGraphs',
  components: {
    AppGraphs
  },
  data() {
    return {
      currentKey: 0
    };
  }
};
</script>
