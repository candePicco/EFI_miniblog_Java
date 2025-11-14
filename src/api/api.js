import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api'
})

// Agrega el token a cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Manejo GLOBAL de errores
api.interceptors.response.use(
  response => response,
  error => {
    // Si la API responde token inválido o expirado
    if (error.response?.status === 401) {
      // Eliminamos token
      localStorage.removeItem('token')

      // Redirigir al login
      window.location.href = '/login'
    }

    // Prohibido por rol
    if (error.response?.status === 403) {
      alert('No tenés permisos para realizar esta acción.')
    }

    return Promise.reject(error)
  }
)

export default api
