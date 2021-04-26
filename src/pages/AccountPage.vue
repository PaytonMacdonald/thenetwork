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
            <ProfilePosts v-for="post in state.posts.posts" :key="post.id" :post="post" />
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
import ProfilePosts from '../components/ProfilePostsComponent'
import Promotion from '../components/PromotionsComponent'
import { promotionsService } from '../services/PromotionsService'
import { postsService } from '../services/PostsService'
import Profile from '../components/ProfileComponent'

// import { logger } from '../utils/Logger'
// import { accountService } from '../services/AccountService'
// import { useRoute } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    // const route = useRoute()
    const state = reactive({
      newPost: {},
      promotions: computed(() => AppState.promotions),
      posts: computed(() => AppState.activePosts),
      user: computed(() => AppState.user),
      activeProfile: computed(() => AppState.activeProfile),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        // await accountService.getAccount()
        await promotionsService.getPromotions()
        await postsService.getByProfileId(AppState.account.id)
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
    })
    return {
      state,

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
    ProfilePosts,
    Profile
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
