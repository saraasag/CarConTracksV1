import React, { useEffect, useState } from 'react';
import { Box, Button, LinearProgress } 
  from '@material-ui/core';
import { Route, Switch as RouterSwitch} from 'react-router-dom';

import { useAuth } from "../Auth";
import { useEthConnection } from '../EthConnection';
import { Header } from '../Components';
// import pageRoutes from './PageRoutes';
import useStyles from '../styles/style';
// import DashboardPage from './DashboardPage';
import styled from 'styled-components';

// import VerifyExperiencePage from './VerifyExperiencePage';
// import CreateExperiencePage from './CreateExperiencePage';

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

function MainPage () {

  let auth = useAuth();
  let classes = useStyles();
  let ethConnection = useEthConnection();

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
//   const [verifiedExps, setVerifiedExps] = useState(null);
//   const [unverifiedExps, setUnverifiedExps] = useState(null);
//   const [verifyingInvitations, setVerifyingInvitations] = useState(null);
  const [ethData, setEthData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await ethConnection.updateEthData();
    }

    fetchData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let address = auth.user.userAddress;
    setIsLoading(true);
    setUserData(ethConnection.getUserByAddress(address)); 
    setEthData(ethConnection.ethData);
    setIsLoading(false);
  }, [auth.user.userAddress, ethConnection, ethConnection.ethData]);

  console.log(userData, ethData);

  return(
    <div className='App'>
     <Header/>

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
       </div>
  );
}

export default MainPage;