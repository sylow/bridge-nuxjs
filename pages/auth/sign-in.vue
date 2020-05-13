<template>
  <div class="columns">
    <div class="column"></div>      
    <div class="column is-one-third">
      <div class='box'>
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input class="input" type="text" v-model='username'>
            <p class="help">Your first name without spaces</p>
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" v-model='password'>
            <p class="help">Your first name without spaces</p>
          </div>
        </div>        
        <div class="field">
            <button class="button is-success" @click='loginUser'>Log in</button>
        </div>          
      </div>
    </div>
  

    <div class="column"></div>
  </div>      
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      username: 'gokhan',
      password: '123456',
    }
  },
  methods: {
      ...mapActions('auth', ['login',]),
      loginUser () {
        this.login({
          username: this.username, 
          password: this.password
        })
        .then( response => {
          console.log(response);
          this.$router.push({ name: 'app' })
        })
      }
  },
}
</script>
