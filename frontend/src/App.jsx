import React from 'react'
import { 
  Route, 
  Routes,
  BrowserRouter as Router,
  Navigate, 
} from 'react-router-dom'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense' 
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import UserProvider from './contexts/userContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: '',
          style:{
            fontSize: '13px'
          },
        }}
      />
    </UserProvider>
  )
}

export default App

const Root = () => {
   const isAuthenticated = !!localStorage.getItem('token')
   return isAuthenticated ?(
    <Navigate  to ="/dashboard" />
   )
   :
   (
    <Navigate to="/login" />
   )
};