<!---------------------------------------------------------------------------------------------------->
<template>
  <!-- REVIEW this page is not ready, it was just copied over from ProfilePage -->
  <div class="container-fluid">
    <div class="row">
      <!-- <Profile /> -->
      <div class="col">
        <div class="row">
          <div class="col m-5">
            <div>
              <h4 class="text-center">
                results for search
              </h4>
            </div>
            <Results v-for="post in state.posts.posts" :key="post.id" :post="post" />
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
// import Results from '../components/ResultsComponent'
import Promotion from '../components/PromotionsComponent'
import { promotionsService } from '../services/PromotionsService'
import { postsService } from '../services/PostsService'
// import Profile from '../components/ProfileComponent'
// import { logger } from '../utils/Logger'

import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'

export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    const state = reactive({
      promotions: computed(() => AppState.promotions),
      posts: computed(() => AppState.results)
      // user: computed(() => AppState.user),
    })
    onMounted(async() => {
      try {
        await profilesService.getActiveProfile(route.params.id)
        await promotionsService.getPromotions()
        await postsService.getByProfileId(route.params.id) // this needs to be just the active users posts
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
    })
    return {
      state
    }
  },
  components: {
    Promotion
    // ProfilePosts
    // Profile
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
