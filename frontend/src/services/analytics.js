import axios from 'axios'
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api' })
API.interceptors.request.use(cfg => {
  const t = localStorage.getItem('pdflegal_token')
  if (t) cfg.headers.Authorization = 'Bearer ' + t
  return cfg
})

export const AnalyticsAPI = {
  async addEvent(payload) {
    const { data } = await API.post('/analytics/event', payload)
    return data
  },
  async statsByTemplate(params = {}) {
    const { data } = await API.get('/analytics/templates', { params })
    return data
  },
  async timeseriesByTemplate(id, params = {}) {
    const { data } = await API.get(`/analytics/templates/${id}/timeseries`, { params })
    return data
  }
}
