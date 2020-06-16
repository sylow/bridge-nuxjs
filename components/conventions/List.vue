<template>
  <div>
    <ul style='margin-left:2em'>
      <li v-for="convention in this.conventions">
        {{convention.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const _ = require('lodash');

export default {
  computed: mapState({
    conventions: state => state.convention.conventions
  }),
  methods: {
    ...mapActions('convention', ['list']),  
  },
  created(){
    this.list();
  }
}
</script>

<style scoped>
  ul {
    list-style-type: square;
  }
</style>
