<!-------------------------------------------------------------------->

<template>
  <div class="row">
    <div class="col d-flex justify-content-center">
      <!-- REVIEW this button only appears if....but how??? -->
      <div class="" v-if="state.newer != null">
        <button class="mx-2" @click="nextPosts(state.newer)">
          - prev
        </button>
      </div>
      <!-- REVIEW getting older posts goes here -->
      <button class="mx-2" @click="nextPosts(state.older)">
        next -
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col text-center pt-4">
      <span class="">
        page {{ state.page }}
      </span>
    </div>
  </div>
</template>

<!-------------------------------------------------------------------->

<script>
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
import { postsService } from '../services/PostsService'

export default {
  name: 'NewerOlder',
  props: {
    newerOlder: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      page: computed(() => AppState.posts.page),
      newer: computed(() => AppState.posts.newer),
      older: computed(() => AppState.posts.older)
    })
    return {
      state,
      async nextPosts(next) {
        try {
          await postsService.nextPosts(next)
          Notification.toast('loading posts', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
}
</script>

<!-------------------------------------------------------------------->

<style>

</style>

<!-------------------------------------------------------------------->
