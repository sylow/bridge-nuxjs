<template>
  <div>
  <NavigationBar />
  <section id="app" class='section'>
    <div class="container">
      <nuxt />
    </div>
  </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavigationBar from '~/components/NavigationBar.vue'

export default Vue.extend({
  components: {
      NavigationBar
  }
})
</script>

<style scoped>
  section.section{
    padding: 1em !important;
  }
</style>
