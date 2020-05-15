const client = require('axios');
const axios = client.create({
  baseURL: 'http://localhost:3001/',
});

import { Sample, Hand, Deck } from '~/lib/deal';

export const state = () => ({
  deals: [],
})

export const actions = { 
  generate ({ commit }, { range } ) {
    var sample = new Sample(range);
    sample.generate()
    commit('generate', sample)

  },  

  add ({ commit, state }, { index }) {
    axios
    .post('/api/v1/lists/add', {
      deal: state.deals[index]
    })
    .then(response => (commit('add', index)))     
  }
}

export const mutations = {
  generate (state, payload){
    state.deals = payload.deals
  },

  add (state, payload){

  }
}
