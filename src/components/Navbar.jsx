import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Modal from './Modal';
import Cart from './Cart';
import { useCart } from './ContextReducer.js'

export default function Navbar() {
  const [cartView, setCartView] = useState(false)
  const data = useCart()
  const navigate = useNavigate()
  function handleLogout() {
    localStorage.removeItem('authToken');
    navigate('/login')
  }
  function handleCart() {
    setCartView(true);
  }
  
  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-success">
    <div className="container-fluid">
      <Link className="navbar-brand fs-1 fst-italic" to="/">Food Delivery</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link active fs-5" aria-current="page" to='/'>Home</Link>
          </li>
        </ul>
        <div className='d-flex'>
          {localStorage.getItem('authToken')
          ? <>
              <button className="nav-link bg-white text-success mx-1 " onClick={handleCart} style={{border: 'none'}} >
              Cart<Badge pill bg='danger ms-2'>{data.length}</Badge></button>
              {cartView ? <Modal onClose={() => setCartView(false)}> <Cart /></Modal> : null}
              <button className="nav-link bg-white text-danger mx-1 " onClick={handleLogout} style={{border: 'none'}}>Logout</button>
            </>
          : <>
              <Link className="nav-link bg-white text-success mx-1" to='/login'>Login</Link>
              <Link className="nav-link bg-white text-success mx-1" to='/signup'>Signup</Link>
            </>}
          
        </div>
      </div>
    </div>
  </nav></div>
  )
}
