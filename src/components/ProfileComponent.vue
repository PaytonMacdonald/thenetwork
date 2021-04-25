<!-------------------------------------------------------------------->

<template>
  <div class="col-2 text-center bg-primary shadow profile-tall pt-5">
    <span class="navbar-text">
      <button
        class="btn btn-outline-secondary text-uppercase"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>
      <div class="pb-3" v-else>
        <router-link :to="{ name: 'Profile' }">
          <img :src="user.picture" alt="user photo" height="100" class="rounded-circle mb-3" />
        </router-link>
        <p class="mb-3">{{ user.name }}</p>
        <button class="btn btn-outline-secondary text-uppercase" @click="logout">
          Logout
        </button>
      </div>
    </span>
  </div>
</template>

<!-------------------------------------------------------------------->

<script>
import { reactive, computed } from 'vue'
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'

export default {
  name: 'Profile',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<!-------------------------------------------------------------------->

<style>

</style>

<!-------------------------------------------------------------------->
