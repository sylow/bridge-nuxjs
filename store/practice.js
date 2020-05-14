const client = require('axios');
const axios = client.create({
  baseURL: 'http://localhost:3001/',
});

export const state = () => ({
  deals: [],
  uuid: null,
})

// getters are functions.
export const getters = {
  deals: state => state.deals,
  uuid: state => state.uuid,
}

export const actions = { 
  generate ({ commit }, { range } ) {
    axios
    .post('/api/v1/practices/generate', {
      range: range
    })
    .then(response => (commit('generate', response.data)))   
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
    state.uuid  = payload.uuid
  },

  add (state, payload){

  }
}
