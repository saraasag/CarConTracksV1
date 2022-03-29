import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LogInPage from './components/LogInPage'
import App from './App';
import Signup from './pages/Signup';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={App}></Route>
      <Route exact path='/signup' component={Signup}></Route>
      <Route exact path='/login' component={LogInPage}></Route>
    </Routes>
  );
}

export default Main;