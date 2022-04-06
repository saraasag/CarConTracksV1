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

### 1. Clone Repository

```sh
$ git clone https://github.com/mattfaltyn/CarConTracksV1.git
$ cd CarConTracksV1/DApp
```
    
### 2. Install Dependencies

```sh
$ npm install metamask-react
```
    
### 3. Run DApp

##### Start up Ganache-cli or GUI

```sh
$ ./ganache-cli
```

##### Deploy contract
```sh
$ truffle migrate
```

##### Run Animal AdoptionRun Dapp
```sh
$ cd Frontend
$ npm install metamask-react
$ npm start
```
Browser will launch on [http://localhost:3000](http://localhost:3000).
