<template>
  <div class='columns'>    
    <div class='column'>
        
      <div v-for="index in numberOfHands" :key="index" class='notification'>
        <div class="is-pulled-right">
          <span class="tag icon is-large">
              <a class="mdi mdi-24px mdi-bookmark-plus-outline" @click="saveTo(index)"></a>
          </span>          
        </div>
        <div class='columns'>         
          <div class='column is-offset-2 is-4'>
            <Hand seat='west' :handId="index-1"/>          
          </div>  
          <div class='column is-4'>
            <Hand seat='east' :handId="index-1"/>          
          </div>    
        </div>
      </div>
    </div>    
    <div class='column'>
      <div class="control">
        <label class="radio">
          <input type="radio" name="range" v-model="range" value="15..17">
          1 NT
        </label>
        <label class="radio">
          <input type="radio" name="range" v-model="range" value="20..21">
          2 NT
        </label>
        <label class="radio">
          <input type="radio" name="range" v-model="range" value="23..40">
          2 <i class='mdi mdi-cards-club'></i>
        </label>
        <label class="radio">
          <input type="radio" name="range" v-model="range">
          Random
        </label>        
        <button class='button' @click="dealIt">Deal Practice Hands</button><br/>
      </div>  
      
      {{uuid}}  
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Hand from '~/components/practices/Hand';
const _ = require('lodash');
export default {
  name: 'Dashboard',
  data(){
    return {
      range: '15..17',
      handId: 1,
    }
  },
  computed: {
    ...mapGetters('practice', ['deals']),
    numberOfHands: function(){
      if (_.isEmpty(this.deals)) return 0;
      return this.deals.length;

    },
    uuid: function() {
      if (_.isEmpty(this.practice)) return '';
      return this.practice.uuid;
    }
  },
  methods: {
    ...mapActions('practice', ['new', 'bookmark']),  
    dealIt: function(){
      this.new({range: this.range})
    },

    saveTo: function(index){
      this.bookmark({ index: index })
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
