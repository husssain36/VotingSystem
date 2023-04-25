
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = process.env.REACT_APP_PRIV_KEY || ""

module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    }
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4", // Fetch exact version from solc-bin (default: 
      optimizer: {
        enabled: false,
        runs: 200
      }
    }
  }
};
