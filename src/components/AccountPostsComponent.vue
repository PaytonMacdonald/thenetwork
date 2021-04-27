<!-------------------------------------------------------------------->

<template>
  <div class="card p-3 mx-5 my-4 shadow">
    <div class="row border-bottom mb-3 pb-3">
      <div class="col">
        <div class="row">
          <div class="col-3">
            <img class="rounded-circle mr-3 shadow-sm" :src="post.creator.picture" alt="" width="75" height="75">
          </div>
          <div class="col">
            <h6> {{ post.creator.name }}</h6>
            <p>{{ post.creator.createdAt }}</p>
          </div>
        </div>
      </div>
      <div class="col text-right">
        <span><img class="post-image" :src="post.imgUrl" alt=""></span>
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <span>{{ post.body }}</span>
      </div>
      <div class="col-2">
        <button @click="like(post.id)">
          ^
        </button> <span>likes {{ post.likes.length }}</span>
      </div>
    </div>
    <!-- delete button -->
    <div v-if="state.user.isAuthenticated && post.creatorId === state.account.id">
      <div class="row">
        <div class="col">
          <button type="submit" class="btn btn-secondary" @click="deletePost(post.id)">
            delete post
          </button>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<!-------------------------------------------------------------------->

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { profilesService } from '../services/ProfilesService'
import Notification from '../utils/Notification'

export default {
  name: 'AccountProfilePosts',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      posts: computed(() => AppState.posts),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deletePost(id) {
        try {
          await postsService.deletePost(id)
          await profilesService.getActiveProfile(AppState.account.id)
          await postsService.getByProfileId(AppState.account.id)
          Notification.toast('Post Deleted', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async like(id) {
        try {
          await postsService.likePost(id)
          await profilesService.getActiveProfile(AppState.account.id)
          await postsService.getByProfileId(AppState.account.id)
          Notification.toast('Success', 'success')
        } catch (error) {
          Notification.toast('Unable to Like: ' + error, 'error')
        }
      }
    }
  }
}
</script>

<!-------------------------------------------------------------------->

<style scoped>
.post-image{
  max-width: 10rem;
}
.card-size{
  max-width: 50rem;
}
.bottom-border{
  border-bottom-color: gray;
  border-bottom-width: 1rem;
}
</style>

<!-------------------------------------------------------------------->
