import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  profiles: [],
  activeProfile: {},
  activePosts: [],
  posts: {},
  promotions: [],
  results: [],
  likes: [],
  newer: null,
  older: null
})
