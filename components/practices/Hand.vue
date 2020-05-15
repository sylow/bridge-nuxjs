<template>
  <div  v-bind:class="[this.seat == 'south' ? 'has-background-light' : '', 'box']">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <span class="mdi mdi-name"></span>

          <div v-for="card_type in card_types" :key="card_type.type">
            <span class='card-type'><i :class="['mdi', card_type.class]"></i></span> 
            <span v-for="item in by_type(card_type.type)" :key="card_type.class+item.value">
              {{item.value}}
            </span><br />
          </div>
        </div>
        <nav class="level is-mobile player-information">
          <div class="level-left">
          </div>

          <div class="level-right">              
            <div class="tags has-addons are-normal">
              <span class="tag is-light">{{this.points}}</span>
              <span class="tag is-light">{{this.seat[0].toUpperCase()}}</span>
            </div>
          </div>          
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const _ = require('lodash');

export default {
  props: ['seat', 'handId'],
  data(){
    return{
      card_types: [
                    {type: 'spade',class: 'mdi-cards-spade'},
                    {type: 'heart',class: 'mdi-cards-heart has-text-danger'},
                    {type: 'diamond',class: 'mdi-cards-diamond has-text-danger'},
                    {type: 'club',class: 'mdi-cards-club'},
                  ]
    }
  },
  methods: {
    by_type: function(type){
      if (_.isEmpty(this.hand)) return [];
      return _.filter(this.hand.cards, {type})
    },
  },
  computed: {
    ...mapState({ deals: state => state.practice.deals }),
    hand: function () {
      if (_.isEmpty(this.deals)) return {};
      return _.find(this.deals[this.handId].hands, {seat: this.seat});
    },
    points: function(){
      if (_.isEmpty(this.deals)) return 0
      return _.find(this.deals[this.handId].hands, {seat: this.seat}).points;
    }
  }  
}
</script>

<style scoped>
  .card-type {
    display: inline-block;
    width:20px;
  }
  .card-type i{
    font-size: 106%
  }
  .player-information{
    color: #888;
    font-size: 90%;
  }
</style>