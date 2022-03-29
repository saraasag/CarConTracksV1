// import React from 'react';
// import styled from 'styled-components';
// import { ThemeProvider, Container, Grid, LinearProgress, Box, Button, TextField, OutlinedInput, InputAdornment, IconButton, FormControl, InputLabel, FormHelperText  } from '@material-ui/core';
// import theme from './styles/theme';
// import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
// import CheckIcon from '@material-ui/icons/Check';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// import useStyles from './styles/style';
// import './App.css';
// import {
// 	Nav,
// 	Bars,
// 	NavBtn,
// 	NavBtnLink,
// 	} from './NavbarElements';
// import AppBar from "@mui/material/AppBar";
// import Typography from "@mui/material/Typography";
// import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
// import { Outlet, Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { Title } from './Components';
// // page routes

// // import {
// //   BrowserRouter as Router,
// //   Switch,
// //   Route,
// //   Redirect
// // } from 'react-router-dom';

// import { useEthConnection } from './EthConnection';
// import { useAuth } from './Auth'; 
// // Import ABI Code to interact with smart contract
// import CarRental from "./artifacts/contracts/CarRental.sol/CarRental.json";

// const carRentalAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
// const Button1 = styled.button`
//   background-color: black;
//   color: white;
//   font-size: 20px;
//   padding: 10px 60px;
//   border-radius: 5px;
//   margin: 10px 0px;
//   cursor: pointer;
// `;
// const Button2 = styled.button`
//   background-color: white;
//   color: black;
//   font-size: 20px;
//   padding: 10px 60px;
//   border-radius: 5px;
//   margin: 10px 0px;
//   cursor: pointer;
// `;
// function Header() {
//   return (
    
//     <AppBar position="static">
//     <Nav>
//       {/* The Typography component applies
//       default font weights and sizes */}
//       <Typography variant="h4" align = "left"
//         component="div" sx={{ flexGrow: 1 }}>
//         CarConTracks
//       </Typography>
//       <Bars />
//       <NavBtn>
//       <NavBtnLink component={SignInPage} to='pages/SignInPage'>Log In</NavBtnLink>
//       </NavBtn>
//           <NavBtn>
//       <NavBtnLink component={SignUpPage} to='pages/SignUpPage'>Sign Up</NavBtnLink>
//       </NavBtn>
//     </Nav>
//     </AppBar>
    
//   );
//   }
  

// function Home() {
//     return (
//       <Router>
//       <div className='App'>
//        <Header/>
  
//         <div className='App-header'>
//          <h1>CarConTracks</h1>
//          <h2>Your destination is just a few clicks away</h2>
//          </div>
//          <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
//          <div className= 'signup-button'>
//          <Button1 component= {Link}
//             to={SignUpPage}>
//           <Link to="/SignUpPage">Sign Up</Link> |{'   '} 
//           </Button1>
//           <SignUpPage/>
//           </div>
//          <div className= 'login-button'>
//          <Button2 
//             component= {Link}
//             to={SignInPage}>
//             <Link to="/SignInPage">Log In</Link> |{'   '} 
//          </Button2>
//          <SignInPage/>
//             </div> 
//           <div className='App-header'>
//            <h1>Rent or Loan?</h1>
//            <h2>Please select whether you would like to rent or loan your car.</h2>
//            </div>
//            <div className= 'rent-button'>
//            <Button1>Rent a Car</Button1>
//            </div>
//            <div className= 'loan-button'>
//            <Button2 >Loan a Car</Button2>
//            </div>
//           </nav>
//           <Outlet />
  
//             {/* <Routes>
//                   <Route path='/SignInPage'>
//                     <SignInPage/>
//                   </Route>
  
//                   <Route path='/SignUpPage'>
//                   <SignUpPage/>
//                   </Route>
//             </Routes> */}
//             </div> 
//           </Router>
  
//   );
//   }
//   export default Home;


  