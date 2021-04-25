// imports

// class

// getSearch goes here ('/api/profiles?query=')
import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfilesService {
  async getProfileSearch(query) {
    const res = await api.get(query) // GET https://bcw-sandbox.herokuapp.com/api/posts?query=>>>whats entered goes here<<<
    AppState.results = res.data.results // map(r => new Movie(r)) does it need this???
  }

  async getActiveProfile(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.activeProfile = res.data
  }

  async getProfilePosts() {
    const res = await api.get(`api/profiles?creatorId=${AppState.account.id}`) // GET https://bcw-sandbox.herokuapp.com/api/profiles/:id
    AppState.myProfiles = res.data
  }

  async addPost(profileId, post) {
    await api.post(`api/profiles/${profileId}/photos`, post) // GET https://bcw-sandbox.herokuapp.com/api/profiles/:id/posts
    this.getActive(profileId)
  }
}

export const profilesService = new ProfilesService()
