import React from 'react';
import styled from 'styled-components';
import { ThemeProvider } from '@material-ui/core';
import theme from './styles/theme';
import './App.css';
import {
	Nav,
	Bars,
	NavBtn,
	NavBtnLink,
	} from './NavbarElements';
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
// Import pages
import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

// page routes
import pageRoutes from './pages/PageRoutes';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, 
  useHistory
} from 'react-router-dom';

import { useEthConnection } from './EthConnection';
import { useAuth } from './Auth'; 
// Import ABI Code to interact with smart contract
import CarRental from "./artifacts/contracts/CarRental.sol/CarRental.json";

const carRentalAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const Button1 = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
const Button2 = styled.button`
  background-color: white;
  color: black;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
function Header() {
  
  return (
    
    <AppBar position="static">
    <Nav>
      {/* The Typography component applies
      default font weights and sizes */}
      <Typography variant="h4" align = "left"
        component="div" sx={{ flexGrow: 1 }}>
        CarConTracks
      </Typography>
      <Bars />
      <NavBtn onClick={pageRoutes.SignInPage} >
      <NavBtnLink to='/SignInPage'>Log In</NavBtnLink>
      </NavBtn>
      <NavBtn onClick={pageRoutes.SignUpPage}>
      <NavBtnLink  to='/SignUpPage'>Sign Up</NavBtnLink>
      </NavBtn>
    </Nav>
    </AppBar>
    
  );
  }
function Home() {
    const history = useHistory();
  
    const signupPage = () => {
        history.push("/SignUpPage")
    }
    const signinPage = () => {
      history.push("/SignInPage")
  }
    return (
      <Router>
      <div className='App'>
       <Header/>
  
        <div className='App-header'>
         <h1>CarConTracks</h1>
         <h2>Your destination is just a few clicks away</h2>
         </div>
         <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
         <div className= 'signup-button'>
         <Button1 
          onClick={signupPage} > Sign Up
          </Button1>
          {/* <SignUpPage/> */}
          </div>
         <div className= 'login-button'>
         <Button2 
            onClick={signinPage}> Sign In
         </Button2>
         {/* <SignInPage/> */}
            </div> 
          <div className='App-header'>
           <h1>Rent or Loan?</h1>
           <h2>Please select whether you would like to rent or loan your car.</h2>
           </div>
           <div className= 'rent-button'>
           <Button1>Rent a Car</Button1>
           </div>
           <div className= 'loan-button'>
           <Button2 >Loan a Car</Button2>
           </div>
          </nav>
  
            {/* <Routes>
                  <Route path='/SignInPage'>
                    <SignInPage/>
                  </Route>
  
                  <Route path='/SignUpPage'>
                  <SignUpPage/>
                  </Route>
            </Routes> */}
            </div> 
          </Router>
  
  );
  }


function App() {
  let auth = useAuth();
  let ethConnection = useEthConnection();
  let signedIn = auth.user != null;

  useEffect(() => {
    auth.refreshed();
  }, [auth]);

  useEffect(() => {
    const fetchData = async () => {
      await ethConnection.updateEthData();
    }

    fetchData();
  }, [ethConnection]);
  return (
  <ThemeProvider theme={theme}>
          <Router>
            <div>
              {/* Switch of entry pages */}
              <Switch>
                <Route exact path='/'>
                  <Redirect to={Home} />
                  <Home/>
                </Route>

                <Route exact path={pageRoutes.SignInPage} component = {SignInPage} > 
                <SignInPage/>
                  {signedIn ? <Redirect to={pageRoutes.MainPage} /> : <SignInPage /> }
                </Route>

                <Route exact path={pageRoutes.SignUpPage}>
                <SignUpPage/>
                  {signedIn ? <Redirect to={pageRoutes.MainPage} /> : <SignUpPage /> }
                </Route>

                <Route exact path={pageRoutes.MainPage}>
                  {signedIn ? <MainPage /> : <Redirect to={pageRoutes.SignInPage} /> }
                </Route>

              </Switch>
            </div>
          </Router>
      </ThemeProvider>
);
}
export default App;


  