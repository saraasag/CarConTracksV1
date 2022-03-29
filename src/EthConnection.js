import { createContext, useState, useContext } from "react";
import { ethers } from "ethers";
// Import ABI Code to interact with smart contract
import CarRental from "./artifacts/contracts/CarRental.sol/CarRental.json";
const carRentalAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export const ethConnectionContext = createContext();

export const useEthConnection = () => {
  return useContext(ethConnectionContext);
};
export const CarStatus = {
    Available: true,
    Unavailable: false,
};
async function requestAccount() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.log("error");
        console.error(error);
        alert("Login to Metamask first");
      }
};
export const useProvideEthConnection = () => {
    const [ethData, setEthData] = useState(null);
    const [activeEthAccount, setActiveEthAccount] = useState(null);
    const [carRental, setCarRental] = useState(null);
    const updateEthData = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(carRentalAddress, CarRental.abi, signer);
        const accounts = await requestAccount();
        console.log(accounts);
        setActiveEthAccount(accounts[0]);
        setCarRental(contract);
        const {methods} = contract; 
        const totalUserNumber = await methods.totalUserNumber().call();
        const totalCarNum = await methods.totalCarNum().call();
        const users = [];
        const cars = [];
        for (let i = 1; i <= totalCarNum; i ++) {
          const car = await methods.cars(i).call();
          cars.push(car);
        }
        for (let i = 1; i <= totalUserNumber; i ++) {
           const user = await methods.users(i).call();
           users.push(user);
        }
        console.log(totalUserNumber, totalCarNum, users, cars);
        setEthData({totalUserNumber, totalCarNum, users, cars});
    }
    const getUserByAddress = (address) => {
        if (ethData == null) {
          return null;
        }
    
        let {totalUserNumber, users} = ethData; 
        for (let i = 0; i < totalUserNumber; i ++) {
          if (users[i].userAddress.toUpperCase() === address.toUpperCase()) {
            return users[i];
          }
        }
    
        return null;
      }
    const getAvailableCarsByID = (Id) => {
        if (ethData == null) {
          return [];
        }
        let {totalCarNum, cars} = ethData;
    
        let availablecars = [];
        for (let i = 0; i < totalCarNum; i ++) {
          if (cars[i].status === CarStatus.Available) {
            availablecars.push(cars[i]);
          }
        }
    
        return availablecars; 
      }
    const getAllUsers = () => {
        if (ethData == null) {
          return [];
        }
        let { users } = ethData;
        return users;
      }
      const fakeData = () => {
        // localStorage.setItem('ethData', JSON.stringify({
        setEthData({
          totalUserNumber: 2,
          totalCarNum: 6,
          users: [
            {
              userName: 'User Name',
              userAddress: 'testUser',
              
            },
            {
              userName: 'User Name',
              userAddress: 'testUser',
            },
          ],
          cars: [
            {
                isAvailable: true,
                carOwner: 'testOwner',
                carLocation: 'testLocation',
                carID: 1,
                price: 1,
                ownerName: 'testName',
            },
            {
                isAvailable: true,
                carOwner: 'testOwner',
                carLocation: 'testLocation',
                carID: 2,
                price: 1,
                ownerName: 'testName',
            },
            {
              isAvailable: true,
              carOwner: 'testOwner',
              carLocation: 'testLocation',
              carID: 3,
              price: 1,
              ownerName: 'testName',
            },
            {
                isAvailable: true,
                carOwner: 'testOwner',
                carLocation: 'testLocation',
                carID: 4,
                price: 1,
                ownerName: 'testName',
            },
            {
                isAvailable: true,
                carOwner: 'testOwner',
                carLocation: 'testLocation',
                carID: 5,
                price: 1,
                ownerName: 'testName',
            },
            {
                isAvailable: true,
                carOwner: 'testOwner',
                carLocation: 'testLocation',
                carID: 6,
                price: 1,
                ownerName: 'testName',
            },
          ],

        });
    
        // setEthData(JSON.parse(localStorage.getItem('ethData')));
    
        return true;
      }
    
      const clearData = () => {
        setEthData(null);
        // localStorage.setItem('ethData', null);
      }
      return {
        ethData,
        carRental,
        activeEthAccount, 
        clearData,
        updateEthData,
        fakeData,
        getUserByAddress,
        getAvailableCarsByID,
        getAllUsers,
      };
    }
    

