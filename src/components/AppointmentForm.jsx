import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAppointment } from '../features/appointments/appointmentSlice'

function AppointmentForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createAppointment({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Appointment</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Appointment
          </button>
        </div>
      </form>
    </section>
  )
}

export default AppointmentForm
