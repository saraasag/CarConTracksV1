// Solidity version - using above 0.8.0
pragma solidity ^0.8.0;

// Begin contract
contract CarSale {

    // Mapping from address to CarSale struct
    mapping(address => CarSale) public orders;

    // Define price which will be the same for every order
    uint price = 10 ether;
    
    // Define struct: CarSale
    struct CarSale {
        bool validOrder;
        string customerName;
        string customerAddress;
        bool orderConfirmed;
    }

    // Constructor
    constructor() {}
    
    // Create modifier which restricts confirmCarOrder to having validOrder equal to true
    modifier restrictValid() {
    	require(orders[msg.sender].validOrder==true, 'Car order is cancelled');
    	_;
    }

    // Define function to create car order 
    function createCarOrder(string memory _customerName, string memory _customerAddress) public payable {
        require(bytes(_customerName).length > 0, "Please enter your name.");
        require(bytes(_customerAddress).length > 0, "Please enter your address.");
    
        require(!(orders[msg.sender].validOrder==true && orders[msg.sender].orderConfirmed==false), 
            "Order is unconfirmed");

        orders[msg.sender] = CarSale(true, _customerName, _customerAddress, false);

        require(msg.value >= price, 'Please add more Ether to the contract');
    }

    // Define function to confirm car order
    function confirmCarOrder() public restrictValid{
        orders[msg.sender].orderConfirmed = true;
    }

    // Define function to cancel car order
    function cancelCarOrder() public payable {
        require(orders[msg.sender].orderConfirmed==false, 'You have already confirmed your order.');
        orders[msg.sender].validOrder = false;
        payable(msg.sender).transfer(price);
    }

}
