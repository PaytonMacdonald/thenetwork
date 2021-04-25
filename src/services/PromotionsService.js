import { AppState } from '../AppState'
import { api } from './AxiosService'

class PromotionsService {
  async getPromotions() {
    const res = await api.get('api/ads')
    AppState.promotions = res.data
  }
}
export const promotionsService = new PromotionsService()
