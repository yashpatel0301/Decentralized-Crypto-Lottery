const {
  Contract,
} = require('hardhat/internal/hardhat-network/stack-traces/model');

require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: 'https://eth-mainnet.g.alchemy.com/v2/zlT_eZxjsFKUR9XlmW8n9MZoxaCm79cV',
      accounts: ['04eb011a24c93921240ec09271f11c203d180a28c839aa33c0ba5d66145b8e66'],
    },
  },
};
