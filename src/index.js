import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {authContext, useProvideAuth} from './Auth';
import { ethConnectionContext, useProvideEthConnection } from './EthConnection';

import './styles/index.css';

// Provide auth context at the highest level of the App
let ProvideAuth = ({ children }) => {
  let auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

let ProvideEthConnection = ({children}) => {
  let ethConnection = useProvideEthConnection();
  return (
    <ethConnectionContext.Provider value={ethConnection}>
      {children}
    </ethConnectionContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ProvideEthConnection>
    <ProvideAuth>
      <App /> 
    </ProvideAuth>
    </ProvideEthConnection>
  </React.StrictMode>,
  document.getElementById('root')
);