import React from 'react';
import './App.css';
//import { observer } from 'mobx-react';  // mobx-react not working
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Test from './Test';
import Test2 from './Test2';
import Table from './Table';


// routing
function App() {
  return (
    <BrowserRouter>
    <div className='app' >
      <Routes>
      <Route exact path='/' element={<Login />} />
      <Route path='/table' element={<Table />} />
            
      </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;   // observer component listens for changes and updates
