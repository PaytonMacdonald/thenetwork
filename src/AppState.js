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
  // REVIEW how do I properly access likes and read the array length for likeCount?
  likes: []
  // Custom Data /////////////
  // likeCount: this.likes.length
})
