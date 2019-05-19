<template>
  <div>
    <section>
      <div class="container">
        <transition 
          name="fade" 
          mode="out-in">
          <app-graphs-random
            :key="currentKey"
            @reloadComponent="currentKey++"
          />
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import AppGraphsRandom from '~/components/GraphsRandom.vue';

export default {
  name: 'PageGraphsRandom',
  layout: 'dark',
  components: {
    AppGraphsRandom
  },
  data() {
    return {
      currentKey: 0
    };
  },
};
</script>
