# CarConTracks

Code & documentation for the EECE 571G term project: CarConTracks DApp

Authored by Negar Yassaie, Sara Gargoum, Mateusz Faltyn

## Brief Introduction to Our Project
- “On-demand” car-sharing services such as Modo and evo have spread to many urban areas across the world. However, all of these services suffer from issues of centralization such as security issues, privacy issues, and central points of failure; there is a need for decentralized solutions. 
- Our aim in this project is to fill this gap in the market by creating a peer-to-peer car rental decentralized application. 
- CarConTracks is an Ethereum-based DApp that allows individuals with the appropriate legal qualifications (i.e., age and driver’s license) to rent a car for a specific duration of time. Instead of signing in to an app of a centralized carsharing service provider such as Modo or evo, users of CarConTracks will be able to rent a car in a peer-to-peer manner anywhere across the globe where cars are located.

## Running this Project

### Software Versions
The following software versions are used:
- nvm version 0.39.1
- node version 16.13.0
- npm version 8.1.0
- hardhat version 2.9.1
- solidity version 0.8.0

1. Clone the repo and cd into it `git clone https://github.com/symfoni/hardhat-react-boilerplate.git MyProject && cd MyProject`
2. Install deps with yarn `yarn` or npm `npm install`
3. Start hardhat `npx hardhat node --watch`
4. Open up a new terminal
5. Enter the frontend directory: `cd frontend`
6. Install dependencies: `npm install`
7. Import seed phrase in Metamask. The default mnemonic currently used by hardhat is `test test test test test test test test test test test junk`
  1. Please note that you need to sign out from your current Metamask wallet to import a new one. **Instead of logging out**, you can use a new browser profile to do your Ethereum development:
  3. Click your profile icon in the top right corner of Chrome (right next to the hamburger menu icon)
  4. Click "Add"
  5. Give the profile a name and click "Add"
  6. In this new browser window, install Metamask and import the keyphrase above
8. Ensure Metamask RPC is set to `http://localhost:8545` and chainID `31337`.
9. Start the React app: `npm start`

The frontend should open at http://localhost:3000/
