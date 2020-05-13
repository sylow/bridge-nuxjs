<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <nuxt-link v-if="isAuthenticated" class="navbar-item" to="/">Dashboard</nuxt-link>
        <nuxt-link v-if="isAuthenticated" class="navbar-item" to="/practice">Practice</nuxt-link>
        <nuxt-link v-if="isAuthenticated" class="navbar-item" to="{ name: 'dashboard'}">Tables</nuxt-link>

      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <nuxt-link v-if="!isAuthenticated" class="button is-dark" to="/auth/sign-up">Sign up</nuxt-link>
            <nuxt-link v-if="!isAuthenticated" class="button is-dark" to="/auth/sign-in">Sign in</nuxt-link>
            <nuxt-link v-if="isAuthenticated" class="navbar-item" to="/user/friends">Friends</nuxt-link>            
            <a v-if="isAuthenticated" class="navbar-item" @click="logout">Logout</a>
          </div>
        </div>
      </div>
    </div>
</nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'NavigationBar',
  computed: mapGetters('auth', ['isAuthenticated',]),
  methods: {
    ...mapActions('auth', ['logout',]),  
    logoutUser () {
          this.logout()
          .then( _ignore => {
            this.$router.push({ name: 'auth-sign-in' })
          })
    }
  }
}
</script>