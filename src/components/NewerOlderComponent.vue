<!-------------------------------------------------------------------->

<template>
  <span>connected</span>
  <div class="row">
    <div class="col d-flex justify-content-center">
      <!-- REVIEW this button only appears if....but how??? -->
      <button class="mx-2" @click="nextPosts">
        - prev
      </button>
      <!-- REVIEW getting older posts goes here -->
      <button class="mx-2" @click="nextPosts">
        next -
      </button>
    </div>
  </div>
</template>

<!-------------------------------------------------------------------->

<script>
import { reactive } from 'vue'
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

    })
    return {
      state,
      async nextPosts() {
        try {
          await postsService.nextPosts()
          Notification.toast('Profile Changed!', 'success')
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
