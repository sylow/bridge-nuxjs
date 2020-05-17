<template>
  <div class='columns'>    
    <div class='column'>
      <div class="buttons has-addons">
        <button class="button" v-for="config in configs" @click="dealFor(config)" :key="config.name">
          {{config.name}}
        </button>        
      </div> 
      <br/>
      <div class='columns is-multiline'>    
        <div class='column is-6' v-for="index in numberOfHands" :key="index" >
          <div class='notification'>
            <div class="is-pulled-right">
              <span class="tag icon is-large">
                  <a class="mdi mdi-24px mdi-bookmark-plus-outline" @click="saveTo(index)"></a>
              </span>          
            </div>
            <div class='columns'>         
              <div class='column is-6'>
                <Hand seat='west' :handId="index-1"/>          
              </div>  
              <div class='column is-6'>
                <Hand seat='east' :handId="index-1"/>          
              </div>    
            </div>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Hand from '~/components/practices/Hand';
const _ = require('lodash');
export default {
  name: 'Dashboard',
  data(){
    return {
      range: '0..40',
      handId: 1,
    }
  },
  computed: {
    ...mapState({
      deals: state => state.practice.deals,
      configs: state => state.practice.configs,
    }),
    numberOfHands: function(){
      if (_.isEmpty(this.deals)) return 0;
      return this.deals.length;
    },
  },
  methods: {
    ...mapActions('practice', ['generate', 'add']),  
    dealIt: function(range){
      this.generate({range: range})
    },
    dealFor: function(config){
      this.generate({config: config})
    },
    saveTo: function(index){
      this.add({ index: index })
    }
  },
  components: { Hand }
}
</script>

<style scoped>
  .radio {
    margin: 0.5em 1em 0 0;
  }
</style>
