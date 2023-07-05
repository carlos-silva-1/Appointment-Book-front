import { useDispatch } from 'react-redux'
import { deleteAppointment } from '../features/appointments/appointmentSlice'

function AppointmentItem({ appointment }) {
  const dispatch = useDispatch()

  return (
    <div className='appointment'>
      <h2>{appointment.text}</h2>
      <button onClick={() => dispatch(deleteAppointment(appointment._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default AppointmentItem
