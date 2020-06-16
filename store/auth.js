// const alertify = require('alertifyjs');
// import alertify from 'alertifyjs';
// alertify.set('notifier','position', 'top-center');

const client = require('axios');
const axios = client.create({
  baseURL: 'http://localhost:3000/',
});

export const state = () => ({
  user: {},
  access_token: process.browser ? localStorage.getItem('access_token') : null || null,
})

// getters are functions.
export const getters = {
  isAuthenticated: state => {
    return state.access_token != null
  }
}

export const actions = { 
  login ({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      axios
      .post('/api/v1/sessions/sign_in', {
        username: credentials.username,
        password: credentials.password,
      })
      .then(response => {
        localStorage.setItem('access_token', response.data.access_token)
        commit('login', {user: response.data.user, access_token: response.data.access_token})
        resolve(response)
      })
      .catch( error => {
        //alertify.error('You forgot your username or password?');
        reject(error);
      });
    })
  },
  logout ({commit}){
    localStorage.removeItem('access_token')
    return new Promise((resolve) => {
      commit('logout');
      resolve('success');
    });
  }
}

export const mutations = {
  login (state, payload){
    state.user = payload.user
    state.access_token = payload.access_token
  },
  logout (state) {
    state.access_token = null
  }
}
