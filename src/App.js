import './App.css';
import Home from './screens/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './screens/Login';

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import Signup from './screens/Signup';
import CartProvider from './components/ContextReducer';
import Cart from './components/Cart';

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/cart' element={<Cart />}/>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  )
}

export default App;
