import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import router from '../router'

class PostsService {
  async getAllPosts() {
    const res = await api.get('api/posts/')
    AppState.posts = res.data
    logger.log(res.data)
  }

  async getPostSearch(query) {
    const res = await api.get(query) // GET https://bcw-sandbox.herokuapp.com/api/posts?query=>>>whats entered goes here<<<
    AppState.results = res.data.results // map(r => new Movie(r)) does it need this???
  }

  async getMyPosts() {
    const res = await api.get(`api/posts?creatorId=${AppState.account.id}`) // GET https://bcw-sandbox.herokuapp.com/api/profiles/:id
    AppState.myPosts = res.data
  }

  async getByProfileId(id) {
    const res = await api.get(`api/posts?creatorId=${id}`)
    AppState.activePosts = res.data
  }

  async create(data) {
    const res = await api.post('api/posts', data)
    router.push({ name: 'PostDetails', params: { id: res.data.id } })
    // this.getAll()
  }

  async addPhoto(postId, photo) {
    await api.post(`api/posts/${postId}/photos`, photo) // GET https://bcw-sandbox.herokuapp.com/api/profiles/:id/posts
    this.getActive(postId)
  }
}
export const postsService = new PostsService()
