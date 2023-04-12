import React, { useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
export default function Card(props) {
  const {
    description, img, name, options, _id
  } = props.item
  const priceOptions = Object.keys(options[0]);
  const priceValues = Object.values(options[0]);

  const dispatch = useDispatchCart()
  const data = useCart()

  const [state, setState] = useState({
    quantity: '1', size: priceOptions[0]
  })
  async function handleAddToCart(e) {
    const food = data.find(item => item.id === _id)
    if(!food || food.size !== state.size) {
      const totalPrice = eval(state.quantity + '*' + priceValues[priceOptions.findIndex(p => p === state.size)])
      await dispatch({type: 'add', id: _id, name, quantity: state.quantity, size: state.size, totalPrice: totalPrice})
    } else {
      const totalPrice = eval(`(${food.qty} + ${state.quantity}) * ${priceValues[priceOptions.findIndex(p => p === state.size)]}`)
      await dispatch({type: 'update', id: _id, quantity: eval(`(${food.qty} + ${state.quantity})`), totalPrice: totalPrice})
    }

  }
  function handleChange(e) {
    setState({...state, [e.target.id]: e.target.value})
  }
  return (
    <div className="card m-3 col-md-4" style={{width: "18rem", maxHeight: "40rem"}}>
  <img src={img} className="card-img-top" alt={name} style={{height: '150px', objectFit: 'fill'}}/>
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <p className="card-text">{description}</p>
    <div className='container w-100'>
      <select className='m-2 ms-0 h-100 bg-success rounded' id='quantity' onChange={handleChange} value={state.quantity}>
        {Array.from(Array(6), (e, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
      </select>
      <select className='m-2 h-100 bg-success rounded' id='size' onChange={handleChange} value={state.size}>
        {priceOptions.map((p, i) => <option key={i} value={p}>{p.toUpperCase()}</option>)}
      </select>
      <div className='h-100 fs-5'>Total Price: ₹{eval(state.quantity + '*' + priceValues[priceOptions.findIndex(p => p === state.size)])}</div>
      <hr />
      <div className='card-action'>
        <button className='mx-auto bg-success text-dark' onClick={handleAddToCart} id={_id}>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>
  )
}
