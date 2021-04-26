<!-------------------------------------------------------------------->

<template>
  <span>connected</span>
  <div class="row">
    <div class="col d-flex justify-content-center">
      <!-- REVIEW this button only appears if....but how??? -->
      <button class="mx-2">
        - prev
      </button>
      <!-- REVIEW getting older posts goes here -->
      <button class="mx-2">
        next -
      </button>
    </div>
  </div>
</template>

<!-------------------------------------------------------------------->

<script>
import { reactive } from 'vue'

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
      state
    }
  }
}
</script>

<!-------------------------------------------------------------------->

<style>

</style>

<!-------------------------------------------------------------------->
