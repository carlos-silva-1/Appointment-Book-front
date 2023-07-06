import axios from 'axios'

const SERVER_URL = 'https://appointment-book-server.onrender.com';
const API_URL = '/api/appointments/'

// Create new appointment
const createAppointment = async (appointmentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(`${SERVER_URL}${API_URL}`, appointmentData, config)

  return response.data
}

// Get user appointments
const getAppointments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${SERVER_URL}${API_URL}`, config)

  return response.data
}

// Delete user appointment
const deleteAppointment = async (appointmentId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(`${SERVER_URL}${API_URL}` + appointmentId, config)

  return response.data
}

const appointmentService = {
  createAppointment,
  getAppointments,
  deleteAppointment,
}

export default appointmentService
