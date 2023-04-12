import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        location: ''
    });

    function handleChange(e) {
        const id = e.currentTarget.id, value = e.currentTarget.value
        setState(prev => {
            return {...prev, [id]:value}
        })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(state)
        const response = await fetch('http://localhost:5000/user/create', 
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
        }
    }
  return (<div className='container'>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={handleChange} value={state.name}  />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" onChange={handleChange} value={state.email} />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={handleChange} value={state.password} />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Address</label>
    <input type="text" className="form-control" id="location" onChange={handleChange} value={state.location} />
  </div>
  <button type="submit" className="btn btn-primary mb-3">Submit</button>
  <div className='mb-3'>Registered? <Link to='/login'>Click here to login</Link></div>
</form>
</div>
  )
}
