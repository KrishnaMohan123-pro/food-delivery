import React, { createContext, useContext, useReducer } from "react";
const CartStateContext = createContext();
const CartDispatchContext =  createContext();
function reducer(state, action) {
    switch(action.type) {
        case 'add': return [...state, {
            id: action.id, 
            name: action.name, 
            qty: action.quantity, 
            size: action.size, 
            totalPrice: action.totalPrice
        }]
        case 'remove': const newArr = [...state];
                newArr.splice(action.index, 1);
                return newArr;
        case 'update': const arr = [...state];
                const food = arr.find(i => i.id === action.id);
                food.qty = action.quantity;
                food.totalPrice = action.totalPrice
                return arr;
        case 'drop': return [];
        default: console.log('default')
    }
    console.log('state', state)
}
const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export default CartProvider
export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)