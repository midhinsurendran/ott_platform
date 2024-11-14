import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './Components/LandingPage'
import SignUp from './Components/SignUp'
import Login from './Components/Login';
import ForgotPasswordEmail from './Components/ForgotPasswordEmail';
import ForgotPasswordConfirm from './Components/ForgotPasswordConfirm';
import Home from './Components/Home';
import ChangePassword from './Components/ChangePassword';
import Subscribe from './Components/Subscribe';
import WatchList from './Components/WatchList';
import WatchHistory from './Components/WatchHistory';
import SubscriptionPlan from './Components/SubscriptionPlan';
import ViewPage from './Components/ViewPage';

function App() {
  
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/forgotpasswordemail' element={<ForgotPasswordEmail/>}></Route>
        <Route path='/forgotpasswordconfirm' element={<ForgotPasswordConfirm/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/changepassword' element={<ChangePassword/>}></Route>
        <Route path='/subscribe' element={<Subscribe/>}></Route>
        <Route path='/watchlist' element={<WatchList/>}></Route>
        <Route path='/watchhistory' element={<WatchHistory/>}></Route>
        <Route path='/subscriptionplan' element={<SubscriptionPlan/>}></Route>
        <Route path='/viewpage/:id' element={<ViewPage/>}></Route>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
