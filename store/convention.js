const client = require('axios');
const axios = client.create({
  baseURL: 'http://localhost:3000/',
});

export const state = () => ({
  conventions: [],
})

export const actions = { 
  list ({ commit }) {
    axios
    .get('/api/v1/conventions')
    .then(response => (commit('list', response)))     
  }
}

export const mutations = {
  list (state, payload){
    state.conventions = payload.data
  },
}
