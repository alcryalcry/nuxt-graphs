<template>
  <div>
    <section class="section">
      <div class="container">
        <app-notes />
      </div>
    </section>
  </div>
</template>

<script>
import AppNotes from '~/components/Notes.vue'

export default {
	components: {
		AppNotes
	}
}
</script>