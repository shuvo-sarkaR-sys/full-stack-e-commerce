   import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOTP from './pages/VerifyOTP'
import ResetPassword from './pages/ResetPassword'
import PrivateRoute from './components/PrivateRoute'
import CategoryPage from './pages/CategoryPage'
import Categories from './pages/CategoryMain'
import ProductDetails from './pages/ProductDetails'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import UserProfile from './pages/UserProfile'
import Cart from './pages/Cart'
import SearchPage from './pages/SearchPage'
import BrandList from './components/Brand'
import BrandPage from './pages/BrandPage'
import Checkout from './pages/ChackOut'
import Contact from './pages/Contact'
import About from './pages/About'
import Footer from './components/Footer' 
import UserVerifyOtp from './pages/UserVerifyOtp'
function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
         <Route path='/login' element={<Login/>}/>
        <Route path='/userlogin' element={<UserLogin/>}/>
                <Route path="/userregister" element={<UserRegister />} />
        <Route path="/profile" element={<UserProfile />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
<Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/brands" element={<BrandList />} />
        <Route path="/brand/:brand" element={<BrandPage />} />
                <Route path="/product/:slug" element={<ProductDetails />} />
<Route path="/cart" element={<Cart />} />
<Route path="/search" element={<SearchPage />} />
<Route path="/checkout" element={<Checkout />} />
<Route path='/about' element={<About/>}/>
<Route path='/contact' element={<Contact/>}/>
<Route path='/admin/*' element={ <PrivateRoute><Dashboard/></PrivateRoute>}/>
<Route path='/user-otp' element={<UserVerifyOtp/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
