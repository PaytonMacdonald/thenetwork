<!---------------------------------------------------------------------------------------------------->
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="row">
          <div class="col m-5">
            <div class="mb-5 text-center">
              <img class="rounded-circle mb-3" :src="state.activeProfile.picture" alt="" width="150" height="150">
              <h4 class="">
                {{ state.activeProfile.name }}
              </h4>
              <p>{{ state.activeProfile.email }}</p>
            </div>
            <ProfilePosts v-for="post in state.posts.posts" :key="post.id" :post="post" />
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
import ProfilePosts from '../components/ProfilePostsComponent'
import Promotion from '../components/PromotionsComponent'
import { promotionsService } from '../services/PromotionsService'
import { postsService } from '../services/PostsService'

import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'

export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    const state = reactive({
      posts: computed(() => AppState.activePosts),
      activeProfile: computed(() => AppState.activeProfile),
      promotions: computed(() => AppState.promotions)
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
    Promotion,
    ProfilePosts
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
