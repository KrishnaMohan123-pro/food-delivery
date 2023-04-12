import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [state, setState] = useState({email: '', password: ''})
  const navigate = useNavigate()
  function handleChange(e) {
    const id = e.currentTarget.id, value = e.currentTarget.value
        setState(prev => {
            return {...prev, [id]:value}
        })
  }
  async function handleSubmit(e) {
    e.preventDefault();
        console.log(state)
        const response = await fetch('http://localhost:5000/user/login', 
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state)
            }
        );
        const json = await response.json()
        console.log(json)
        if(!json.success) {
            alert('Enter Valid Credentials')
        } else {
          localStorage.setItem('email', state.email)
          localStorage.setItem('authToken', json.authToken)
          navigate('/')
        }
  }
  return (
    <div className='container'>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" onChange={handleChange} value={state.email} />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={handleChange} value={state.password} />
  </div>
  <button type="submit" className="btn btn-primary mb-3">Submit</button>
  <div className='mb-3'>New to Food Delivery? <Link to='/signup'>Signup</Link></div>
</form>
</div>
  )
}
