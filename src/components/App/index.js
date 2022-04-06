import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Login from './../Login';
import Signup from './../Signup';
import Subscriptions from './../Subscriptions';
import Subscription from './../Subscription';
import Home from './../Home';
import UserContext from './../../contexts/UserContext';


function App(){
  const [token, setToken] = useState('');
  return(
    <UserContext.Provider value={{token,setToken}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/sign-up' element={ <Signup /> } />
          <Route path='/subscriptions' element={ <Subscriptions /> } />
          <Route path='/subscriptions:planId' element={ <Subscription /> } />
          <Route path='/home' element={ <Home /> } />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

