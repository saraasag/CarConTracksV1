import React, { useState, useEffect } from 'react';
import { Box, IconButton, Button, Container, Grid, TextField, LinearProgress, 
  Typography, Switch, OutlinedInput, InputAdornment, FormControl, InputLabel,
  FormHelperText } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckIcon from '@material-ui/icons/Check';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import useStyles from '../styles/style';
import { Title } from '../Components';
import pageRoutes from './PageRoutes';
import { useAuth } from '../Auth';
import { useEthConnection } from '../EthConnection';

function SignUpPage() {
  let classes = useStyles();
  let [state, setState] = useState({
    // section: 'accountInfo', // alternate between accountInfo and description
    shouldLeave: false, // set this to true to leave sign up page to sign in page
    userName: '',
    userNameInvalid: false,
    password: '',
    passwordInvalid: false,
    showPassword: false,
    ethAccountInvalid: false,
  });
  let [activeEthAccount, setActiveEthAccount] = useState(null);
  let [carRental, setCarRental] = useState(null);

  let auth = useAuth();
  let ethConnection = useEthConnection();

  useEffect(() => {
    setActiveEthAccount(ethConnection.activeEthAccount);
  }, [ethConnection.activeEthAccount]); 

  useEffect(() => {
    setCarRental(ethConnection.carRental);
  }, [ethConnection.carRental]);


  let handleChange = (prop) => (event) => {
    setState({
      ...state, 
      [prop]: event.target.value,
      [prop+'Invalid']: false,
    });
  }

  let submitButtonClicked = async() => {
    let {
      userNameInvalid, 
      passwordInvalid, 
      ethAccountInvalid,
    } = state;
    if (state.userName.length === 0) {
      userNameInvalid = true;
    }

    if (state.password.length === 0) {
      passwordInvalid = true;
    }

    if (activeEthAccount == null) {
      ethAccountInvalid = true;
    }

    if (userNameInvalid || 
      passwordInvalid || ethAccountInvalid) {
      setState({
        ...state, 
        userNameInvalid, 
        passwordInvalid, 
        ethAccountInvalid,
      });
      return;
    }
    

    let success = await auth.signup(
        {...state, ethAccount: activeEthAccount}, carRental);
      
      if (!success) {
        window.alert('Error Occured When Trying to Create an Account');
        return;
      }
  
      ethConnection.updateEthData();
  
      setState({...state, shouldLeave: true});

  }
  let transitToDescription = () => {
    let {
      userNameInvalid, 
      passwordInvalid, 
      ethAccountInvalid,
    } = state;
    if (state.userName.length === 0) {
      userNameInvalid = true;
    }

    if (state.password.length === 0) {
      passwordInvalid = true;
    }

    if (activeEthAccount == null) {
      ethAccountInvalid = true;
    }

    if (userNameInvalid ||
      passwordInvalid || ethAccountInvalid) {
      setState({
        ...state, 
        userNameInvalid, 
        passwordInvalid, 
        ethAccountInvalid,
      });
      return;
    }

    setState({...state, section:'shouldleave'});
  }


return (
  <Container maxWidth='lg' className={classes.content}>
    <Title />
    <Box width='70%'>
        <Grid container className={classes.formGridContainerRow}>
          <Grid item xs={1}>
            <IconButton color='secondary' onClick={() => 
              setState({...state, shouldLeave: !state.shouldLeave})}>
              <HighlightOffIcon fontSize='large' />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.formGridItemColumn} height='350px'>
              <Box className={classes.textField}>
                <TextField
                  value={activeEthAccount == null ? 
                    'Please connect to metamask' : activeEthAccount}
                  id='eth-account'
                  label='Eth Account'
                  variant='outlined'
                  fullWidth={true}
                  color='primary'
                  disabled
                  error={state.ethAccountInvalid}
                  onChange={() => setState({...state, ethAccountInvalid:false})}
                />
              </Box>
              <Box className={classes.textField}>
              <FormControl variant='outlined' fullWidth>
                <InputLabel className={classes.label}>User Name</InputLabel>
                <OutlinedInput
                  id='user-name'
                  type={'userName'}
                  value={state.userName}
                  onChange={handleChange('userName')}
                  color='primary'
                  fullWidth={true}
                  error={state.userNameInvalid}
                />
                {
                  state.userNameInvalid ? 
                  <FormHelperText
                    error
                    variant='outlined'
                  >
                    cannot be empty
                  </FormHelperText> : null
                }
              </FormControl>
                {/* <TextField
                  value={state.userName}
                  id='user-name'
                  label='User Name'
                  variant='outlined'
                  fullWidth={true}
                  color='primary'
                  onChange={handleChange('fullName')}
                  error={state.userNameInvalid}
                  helperText={state.userNameInvalid ? 'cannot be empty' : ''}
                /> */}
              </Box>
              <Box className={classes.textField}>
              <FormControl variant='outlined' fullWidth>
                <InputLabel className={classes.label}>Password</InputLabel>
                <OutlinedInput
                  id='password'
                  type={state.showPassword ? 'text' : 'password'}
                  value={state.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggel password visibility'
                        onClick={() => setState({...state, showPassword: !state.showPassword})}
                        edge='end'
                      >
                        {state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  color='primary'
                  fullWidth={true}
                  error={state.passwordInvalid}
                />
                {
                  state.passwordInvalid ? 
                  <FormHelperText
                    error
                    variant='outlined'
                  >
                    cannot be empty
                  </FormHelperText> : null
                }
              </FormControl>
              </Box>
              <Box className={classes.linearProgress} >
                <LinearProgress 
                  variant='determinate'
                  value={50}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1}>
          <Button 
          className={classes.button}
          variant='contained'
          fullWidth={true}
          color='primary'
          onClick={submitButtonClicked}>
          Sign Up
        </Button>
          </Grid>
        </Grid>
      </Box>
    {state.shouldLeave ? <Redirect to={pageRoutes.SignInPage}/> : null}
  </Container>
);

}
export default SignUpPage