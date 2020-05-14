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
  new ({ commit }, { range } ) {
    axios
    .post('/api/v1/practices', {
      range: range
    })
    .then(response => (commit('new', response.data)))   
  },  

  bookmark ({ commit, state }, { index }) {
    axios
    .post('/api/v1/practices/bookmark', {
      deal: state.deals[index]
    })
    .then(response => (commit('bookmark', index)))     
  }
}

export const mutations = {
  new (state, payload){
    state.deals = payload.deals
    state.uuid  = payload.uuid
  },

  bookmark (state, payload){

  }
}
