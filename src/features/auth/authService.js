import axios from 'axios'

const SERVER_URL = 'https://appointment-book-server.onrender.com';
const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(`${SERVER_URL}${API_URL}`, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    console.log(response)
    console.log(response.data)
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(`${SERVER_URL}${API_URL}` + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
