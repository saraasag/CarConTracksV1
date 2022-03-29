require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');


const { task } = require("hardhat/config");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    localhost: {
      url: "http://127.0.0.1:8545/"
    },
    hardhat:{
      chainId: 1337,
    }
  },
  paths:{
    sources: "./contracts",
    tests: "./test",
    artifacts: "./src/artifacts"
  },
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
