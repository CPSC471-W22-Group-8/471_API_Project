import React from 'react';

import './App.css';
//import { observer } from 'mobx-react';  // mobx-react not working
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Login from './Login';
import MainPage from './MainPage/MainPage';
import AdminLogin from './Admin/LoginForm'
import UserLogin from './User/LoginForm'
import UserPage from './User/UserPage'
import AdminPage from './Admin/AdminPage'
import Entry from './Entry/Entry';
import Group from './Group/Groups';
import EditableLocationProfile from './Admin/EditableLocationProfile';
import SearchLocationProfile from './Admin/SearchLocationProfile';
import SearchEntry from './Entry/SearchEntry';





// routing      <Route path='/fish' element={<FishCaught />} /> <Route path='/conditions' element={<Conditions />} />
function App() {
  return (
    <BrowserRouter>
    <div className='app' >
      <Routes>
      <Route exact path='/' element={<MainPage />} />
      <Route exact path='/admin/login' element={<AdminLogin />} />
      <Route exact path='/user/login' element={<UserLogin />} />
      <Route exact path='/user/userpage' element={<UserPage />} />
      <Route exact path='/admin/adminpage' element={<AdminPage />} />
      <Route path='/entry' element={<Entry />} />
      <Route path='/group' element={<Group />} />
      <Route path='/locationprofile' element={<EditableLocationProfile />} />
      <Route path='/search/entry' element={<SearchEntry />} />
      <Route path='/search/locationprofile' element={<SearchLocationProfile />} />
      </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;   // observer component listens for changes and updates
