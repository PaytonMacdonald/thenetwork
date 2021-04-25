<!---------------------------------------------------------------------------------------------------->
<template>
  <div class="container-fluid">
    <div class="row">
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
            <img :src="user.picture" alt="user photo" height="100" class="rounded  mb-3" />
            <p class="mb-3">{{ user.name }}</p>
            <button class="btn btn-outline-secondary text-uppercase" @click="logout">
              Logout
            </button>
          </div>

        </span>
      </div>
      <div class="col">
        <div class="row">
          <div class="col m-5">
            <h4 class="text-center">
              Everyone's Posts
            </h4>
            <Posts v-for="post in state.posts.posts" :key="post.id" :post="post" />
          </div>
          <div class="col-3 text-center mb-5">
            <Promotion v-for="promotion in state.promotions" :key="promotion.id" :promotion="promotion" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!---------------------------------------------------------------------------------------------------->

<script>
import { onMounted, reactive, computed } from 'vue'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import Posts from '../components/PostsComponent'
import Promotion from '../components/PromotionsComponent'
import { promotionsService } from '../services/PromotionsService'
import { postsService } from '../services/PostsService'
import { AuthService } from '../services/AuthService'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      promotions: computed(() => AppState.promotions),
      posts: computed(() => AppState.posts),
      dropOpen: false
    })
    onMounted(async() => {
      try {
        await promotionsService.getPromotions()
        await postsService.getAllPosts()
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
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
  },
  components: {
    Promotion,
    Posts
  }
}
</script>

<!---------------------------------------------------------------------------------------------------->

<style scoped lang="css">
.profile-tall{
height: 100vh;
}
</style>

<!---------------------------------------------------------------------------------------------------->
