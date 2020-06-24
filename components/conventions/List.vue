<template>
  <div>
    <input v-model='newConvention' v-on:keyup.enter="add"/>
    <ul style='margin-left:2em'>
      <li v-for="convention in this.conventions" :key='convention.id'>
        <nuxt-link  :to="`/conventions/${convention.id}`">{{convention.name}}</nuxt-link>
        {{convention.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const _ = require('lodash');

export default {
  data() {
    return {
      newConvention: ''
    }
  },
  computed: mapState({
    conventions: state => state.convention.conventions
  }),
  methods: {
    ...mapActions('convention', ['list', 'create']),  
    add(){
      if (this.newConvention == '')
        return
      this.create({ name: this.newConvention });
      this.newConvention = '';
    }
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
  input {
    font-size: 18px;
    width: 100%;
    padding: 0.2em;
    margin: 0.3em;
  }
</style>
