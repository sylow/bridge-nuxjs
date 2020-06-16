const client = require('axios');
const axios = client.create({
  baseURL: 'http://localhost:3000/',
});

import { Sample, Hand, Deck } from '~/lib/deal';

export const state = () => ({
  deals: [],
  configs: [
    { 
      name: '1 NT', 
      seats: [
        { seat: 'west', points: { min: 15, max: 17 } }
      ]
    },
    { 
      name: '2 NT + 10 points', 
      seats: [
        { seat: 'west', points: { min: 20, max: 22 } },
        { seat: 'east', points: { min: 10, max: 20 } },
      ]
    },    
    { 
      name: '2 C + 10 points', 
      seats: [
        { seat: 'west', points: { min: 23, max: 40 } },
        { seat: 'east', points: { min: 15, max: 20 } },
      ]
    },      
  ],
})

export const actions = { 
  generate ({ commit }, { config } ) {
    var sample = new Sample(config);
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
