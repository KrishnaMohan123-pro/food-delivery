import React, { useState } from 'react'

export default function Search(props) {
  const [state, setState] = useState('')
  function handleChange(e) {
    setState(e.currentTarget.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    props.handleSearch(state)
  }
  return (
    <div> <form className="d-flex" onSubmit={handleSubmit}>
    <input className="form-control me-2" type="search" placeholder="Search" onChange={handleChange} />
    <button className="btn btn-success text-white" type="submit" >Search</button>
  </form></div>
  )
}
