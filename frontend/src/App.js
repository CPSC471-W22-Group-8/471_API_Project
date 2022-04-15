import React from 'react';

import './App.css';
//import { observer } from 'mobx-react';  // mobx-react not working
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Login from './Login';
import MainPage from './MainPage/MainPage';
import AdminLogin from './Admin/LoginForm'
import UserLogin from './User/LoginForm'
import UserPage from './User/UserPage'

import Test from './Test';
import Test2 from './Test2';
import Table from './Table';
import EditableLocationProfile from './Admin/EditableLocationProfile';
import FishCaught from './User/FishCaught';
import Conditions from './Water Conditions/Conditions';
import Group from './Group/Group';



// routing
function App() {
  return (
    <BrowserRouter>
    <div className='app' >
      <Routes>
      <Route exact path='/' element={<MainPage />} />
      <Route exact path='/admin/login' element={<AdminLogin />} />
      <Route exact path='/user/login' element={<UserLogin />} />
      <Route exact path='/user/login/userpage' element={<UserPage />} />
      {/* <Route path='/table' element={<Table />} /> */}
      <Route path='/locationprofile' element={<EditableLocationProfile />} />
      <Route path='/fish' element={<FishCaught />} />
      <Route path='/conditions' element={<Conditions />} />
      <Route path='/group' element={<Group />} />
            
      </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;   // observer component listens for changes and updates
