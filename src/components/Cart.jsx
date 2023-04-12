import React from 'react'
import { useCart, useDispatchCart } from './ContextReducer'

export default function Cart() {
    const data = useCart();
    const dispatch = useDispatchCart();
    async function handleDelete(e) {
        const index = e.currentTarget.index;
        await dispatch({type: 'remove', index})
    }
    async function handleCheckout(e) {
        const uri = 'http://localhost:5000/checkout'
        const currentDate = new Date().toDateString();
        const orderData = data;
        const email = localStorage.getItem('email')
        const payload = {orderDate: currentDate, orderData, email}
        const response = await fetch(uri, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (json.success) {
            alert('checkout successful')
            dispatch({type: 'drop'})
        } else {
            alert('an error occured')
        }
    }
    if (data.length === 0) {
        return <div className='fs-1 container text-center fst-italic'> The Cart is Empty</div>
    }
    let cartTotal = 0
    data.forEach(item => cartTotal += item.totalPrice)
    return (
        <div className='cart container'>
            <table className="table table-striped table-hove">
            <thead className='text-success fs-4'>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Option</th>
                <th scope="col">Amount</th>
                </tr>
            </thead>
            <tbody>
            {data.map((item, index) => {
                return <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.size.toUpperCase()}</td>
                <td>{item.totalPrice}</td>
                <td><button className='btn btn-danger text-black' onClick={handleDelete} index={index}>Delete</button></td>
                </tr>
            })}
            </tbody>
            </table>
            <div>Total Price: ₹{cartTotal}</div>
            <div><button className='btn btn-success mt-5 p-3 fs-4' onClick={handleCheckout}> Checkout </button></div>
        </div>
    )
}
