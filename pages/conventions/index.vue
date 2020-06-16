<template>
  <div>
    <h1 class='title'>Conventions</h1>
     <List />
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import List from '~/components/conventions/List';
const _ = require('lodash');
export default {
  components: { List }
}
</script>
