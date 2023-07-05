import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import appointmentService from './appointmentService'

const initialState = {
  appointments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new appointment
export const createAppointment = createAsyncThunk(
  'appointments/create',
  async (appointmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await appointmentService.createAppointment(appointmentData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user appointments
export const getAppointments = createAsyncThunk(
  'appointments/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await appointmentService.getAppointments(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user appointment
export const deleteAppointment = createAsyncThunk(
  'appointments/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await appointmentService.deleteAppointment(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.appointments.push(action.payload)
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAppointments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.appointments = action.payload
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteAppointment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.appointments = state.appointments.filter(
          (appointment) => appointment._id !== action.payload.id
        )
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = appointmentSlice.actions
export default appointmentSlice.reducer
