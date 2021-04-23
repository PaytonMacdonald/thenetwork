<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <div class="row d-flex">
      <div class="col-auto bg-primary shadow">
        <span>PROFILES</span>
      </div>
      <div class="col-auto">
        <router-view />
      </div>
    </div>
  </main>
  <footer>
    <div class="text-white container-fluid bg-info">
      <div class="row">
        <div class="col text-center">
          <span>footer content</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
