// src/services/analytics.js  (si este archivo está en /services)
import { API } from "../api/client.js"; // <- ajusta la ruta si tu archivo vive en otro folder

export const AnalyticsAPI = {
  async addEvent(payload) {
    const { data } = await API.post("/analytics/event", payload);
    return data;
  },
  async statsByTemplate(params = {}) {
    const { data } = await API.get("/analytics/templates", { params });
    return data;
  },
  async timeseriesByTemplate(id, params = {}) {
    const { data } = await API.get(`/analytics/templates/${id}/timeseries`, { params });
    return data;
  },
};
