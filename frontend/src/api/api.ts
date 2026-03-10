import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Cache-Control': 'no-cache'
  }
})

export default api