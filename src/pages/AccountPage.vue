<template>
  <!-- <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div> -->

  <div class="container-fluid">
    <!-- REVIEW on refresh, ProfilePosts component will not load -->
    <div class="row">
      <Profile :profile="state.account" />
      <div class="col">
        <div class="row">
          <div class="col m-5">
            <h4 class="text-center">
              Your Posts
            </h4>
            <button class="p-1" @click="getMyPosts">
              manual getMyPosts
            </button>
            <!-- CREATE POST -->
            <form class="mb-5" @submit.prevent="createPost">
              <div class="form-group">
                <label for="PostBody"><b>What do you want to say?</b></label>
                <textarea class="form-control"
                          id="PostBody"
                          rows="3"
                          v-model="state.newPost.body"
                >
                </textarea>
              </div>
              <div class="form-group">
                <label for="postImageUrl">Add Image URL</label>
                <input type="text"
                       class="form-control"
                       id="postImageUrl"
                       placeholder="insert URL"
                       v-model="state.newPost.imgUrl"
                >
              </div>
              <button type="submit" class="btn btn-secondary">
                Post
              </button>
            </form>
            <AccountPosts v-for="post in state.posts.posts" :key="post.id" :post="post" />
          </div>
          <!-- ---------- -->
          <div class="col-3 text-center mb-5">
            <Promotion v-for="promotion in state.promotions" :key="promotion.id" :promotion="promotion" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import AccountPosts from '../components/AccountPostsComponent'
import Promotion from '../components/PromotionsComponent'
import { promotionsService } from '../services/PromotionsService'
import { postsService } from '../services/PostsService'
import Profile from '../components/ProfileComponent'

import { logger } from '../utils/Logger'

export default {
  name: 'Home',
  setup() {
    // const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      newPost: {},
      user: computed(() => AppState.user),
      posts: computed(() => AppState.activePosts),
      activeProfile: computed(() => AppState.activeProfile),
      promotions: computed(() => AppState.promotions)
    })
    onMounted(async() => {
      try {
        logger.log('on mounted runs in the try')
        await postsService.getMyPosts() // this line fails for some reason
        await promotionsService.getPromotions()
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
    })
    return {
      state,

      async getMyPosts() {
        try {
          await postsService.getMyPosts()
          Notification.toast('Added Post', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async createPost() {
        try {
          await postsService.createPost(state.newPost)
          state.newPost = {}
          await postsService.getByProfileId(AppState.account.id)
          Notification.toast('Added Post', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {
    Promotion,
    AccountPosts,
    Profile
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
