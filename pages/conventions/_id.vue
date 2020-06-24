<template>
  <div>
    <h2 class='title is-2'>{{name}}</h2>
    <div v-for="block in blocks" :key="block.id">
      <h5 class='title is-5' v-if="block.title != ''">{{block.title}}</h5>
      <div class='columns' style='margin-bottom:2em'>
        <div class='column is-narrow'>
          <table class="table is-narrow is-striped">
            <thead>
              <tr><th>West</th><th>East</th></tr>
            </thead>
            <tbody>
            <tr v-for='bidRound in block.bidding'>
              <td v-for='bid in bidRound'>
                <div v-html="translate(bid)"></div>
              </td>
            </tr>
            </tbody>
          </table>          
        </div>
        <div class='column'>
           <div v-html="translate(block.description)" style='margin-top:0.5em'></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
const client = require('axios');
const axios = client.create({
  baseURL: 'http://localhost:3000/',
});

import { mapState, mapActions } from 'vuex'
const _ = require('lodash');
export default {
  data(){
    return{
      card_types: {'S': 'mdi mdi-cards-spade',
                   'H' : 'mdi mdi-cards-heart has-text-danger',
                   'D': 'mdi mdi-cards-diamond has-text-danger',
                   'C' : 'mdi mdi-cards-club',
                   'N' : 'mdi mdi-cards-club',
      }
    }
  },
  methods: {
    ...mapActions('convention', ['fetch']), 
    translate : function(text){
      var me = this;
      var res = text.replace(/([1234567])([CDHS])/g, function (match, d, type) {
        return d + `<i class='${me.card_types[type]}'></i>`;
      });
      var res = res.replace (/(SS|HH|DD|CC)/g, function (match, type) {
        return `<i class='${me.card_types[type[0]]}'></i>`;
      })
      return res;
    }
  }, 
  asyncData ({ params } ) {
    console.log(params);
    return axios.get(`http://localhost:3000/api/v1/conventions/${params.id}`)
      .then((res) => {
        return res.data
      })
  },
}
</script>
