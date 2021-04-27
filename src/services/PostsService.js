import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostsService {
  async getAllPosts() {
    const res = await api.get('api/posts/')
    AppState.posts = res.data
    logger.log(res.data)
  }

  async nextPosts(data) {
    const res = await api.get(data)
    AppState.posts = res.data
  }

  async getByProfileId(id) {
    const res = await api.get(`api/posts?creatorId=${id}`)
    AppState.activePosts = res.data
  }

  async getMyPosts() {
    const res = await api.get(`api/posts?creatorId=${AppState.account.id}`)
    AppState.activePosts = res.data
  }

  async getProfilesSearch(query) {
    const res = await api.get(`api/posts?query=${query}`)
    AppState.profileResults = res.data.results // what goes here???
  }

  async createPost(data) {
    await api.post('api/posts/', data)
  }

  async likePost(id) {
    await api.post(`api/posts/${id}/like`)
    this.getAllPosts()
  }

  async deletePost(id) {
    await api.delete('api/posts/' + id)
  }
}
export const postsService = new PostsService()
