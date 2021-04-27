<!-------------------------------------------------------------------->

<template>
  <div class="col-2 text-center bg-primary shadow profile-tall pt-5">
    <div class="navbar-text mb-5">
      <button
        class="btn btn-outline-secondary text-uppercase"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>
      <div class="pb-3" v-else>
        <router-link :to="{ name: 'Account'}">
          <img :src="state.account.picture" alt="user photo" height="100" class="rounded-circle mb-3 shadow-sm" />
        </router-link>
        <p class="mb-3">
          {{ state.account.name }}
        </p>
        <p>
          <button class="btn btn-outline-secondary text-uppercase" @click="logout">
            Logout
          </button>
        </p>
        <p class="mt-5">
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#exampleModal">
            Edit Profile
          </button>
        </p>

        <!-- Modal -->
        <div class="modal fade"
             id="exampleModal"
             tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit Profile
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <!-- FORM -->
                <form @submit.prevent="editProfile">
                  <div class="form-group">
                    <label for="profileName">Change Name</label>
                    <input type="text"
                           class="form-control"
                           id="profileName"
                           placeholder="enter new name"
                           v-model="state.profileEdits.name"
                    >
                  </div>
                  <div class="form-group">
                    <label for="changePicture">Change Picture</label>
                    <input type="text"
                           class="form-control"
                           id="changePicture"
                           placeholder="enter imgUrl"
                           v-model="state.profileEdits.picture"
                    >
                  </div>
                  <button type="submit" class="btn btn-secondary">
                    Save Changes
                  </button>
                </form>
                <!--  -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-------------------------------------------------------------------->

<script>
import { reactive, computed } from 'vue'
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import Notification from '../utils/Notification'

export default {
  name: 'Profile',
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      profileEdits: {},
      dropOpen: false,
      account: computed(() => AppState.account)
    })
    return {
      state,

      async editProfile() {
        try {
          await accountService.editProfile(state.profileEdits)
          state.profileEdits = {}
          Notification.toast('Profile Changed!', 'success')
          // reDraw the profile
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
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

<!-------------------------------------------------------------------->

<style>

</style>

<!-------------------------------------------------------------------->
