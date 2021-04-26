<!---------------------------------------------------------------------------------------------------->
<template>
  <div class="container-fluid">
    <div class="row">
      <Profile :profile="state.account" />
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

import Profile from '../components/ProfileComponent'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      promotions: computed(() => AppState.promotions),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account)
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
      state
    }
  },
  components: {
    Promotion,
    Posts,
    Profile
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
