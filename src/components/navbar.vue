<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img
          alt="logo"
          src="../assets/img/network-logo.png"
          height="45"
        />
      </div>
    </router-link>
    <router-link :to="{ name: 'Home'}">
      <span class="px-1">home</span>
    </router-link>
    <router-link :to="{ name: 'Account'}">
      <span class="px-1">profile</span>
    </router-link>
    <div class="col d-flex justify-content-right">
      <!-- search bar -->
      <form @submit.prevent="search">
        <div class="form-row align-items-center">
          <div class="col-auto">
            <input type="text"
                   class="form-control"
                   id="inlineFormInput"
                   placeholder="find someone"
                   v-model="state.query"
            >
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-secondary">
              <i class="fas fa-search-location    ">Search</i>
            </button>
          </div>
        </div>
      </form>
      <!-- ----- -->
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { postsService } from '../services/PostsService'
// import Notification from '../utils/Notification'

export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      query: '',
      dropOpen: false
    })
    return {
      state,
      async search() {
        try {
          await postsService.getProfilesSearch(state.query)
          state.query = ''
        } catch (error) {
          Notification.toast('Error:' + error, 'error')
        }
      },
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

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>
