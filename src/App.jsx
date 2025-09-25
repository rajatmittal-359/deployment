import { useState } from 'react'
import './App.css'
import Fetch from './Fetch'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Cart from './Cart'
import ProductDetails from './ProductDetails'
import UseDarkMode from './hooks/UseDarkMode';
import ProtectedRoute from './ProtectedRoute'
function App() {
const{ isDarkMode, toggleDarkMode}=UseDarkMode();
  return (
    <>  
    <BrowserRouter>
    <div className={`${isDarkMode?"dark bg-gray-900 text-white": " bg-white-900 text-black"} min-h-screen`}>
        <div>
        <button onClick={toggleDarkMode} className="px-4 py-2 border rounded-lg hover:bg-gray-200 dark:hover:bg-gray-400">
          {isDarkMode ? "Ligh Mode":"Dark-Mode"}
        </button>
        </div>
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path='fetch' element={<Fetch />}/>
      <Route path='signup' element={<Signup />}/>
      <Route path='login' element={<Login />}/>
      {/* <Route path='cart' element={<Cart />}/> */}
      <Route
          path="/cart"
          element={
            <ProtectedRoute>
             <Cart/>
            </ProtectedRoute>
          }
        />
      <Route path='/fetch/:id' element={<ProductDetails />} />
      </Route>
    </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
